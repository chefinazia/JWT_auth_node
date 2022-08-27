    _       = require('lodash'),
    config  = require('../config.json'),
    jwt     = require('jsonwebtoken');


let usersArray = [
    {
        id: 1,
        username: 'rachit',
        password: 'rachit'
      }
]
function createIdToken(user) {
    return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
  }

function genJti() {
let jti = '';
let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for (let i = 0; i < 16; i++) {
    jti += possible.charAt(Math.floor(Math.random() * possible.length));
}

return jti;
}
function createAccessToken() {
return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    scope: 'full_access',
    sub: "rachit",
    jti: genJti(), // unique identifier for the token
    alg: 'HS256'
}, config.secret);
}
exports.createUser = (req,res)=> {
    let params = req.body;
    let {username,password}=params
    let userData = this.getUserData(req);  

    if (!username || !password) {
        return res.status(400).send("username and password both are required");
    }

    if (_.find(usersArray, userData.userSearch)) {
    return res.status(400).send("user already exists");
    }

    var profile = _.pick(req.body, userData.type, 'password', 'extra');
    profile.id = _.max(usersArray, 'id').id + 1;

    usersArray.push(profile);

    res.status(201).send({
        id_token: createIdToken(profile),
        access_token: createAccessToken()
    });
}

exports.getUserData = (req) =>{
  
    var username;
    var type;
    var userSearch = {};
  
    // The POST contains a username and not an email
    if(req.body.username) {
      username = req.body.username;
      type = 'username';
      userSearch = { username: username };
    }
    // The POST contains an email and not an username
    else if(req.body.email) {
      username = req.body.email;
      type = 'email';
      userSearch = { email: username };
    }
  
    return {
      username: username,
      type: type,
      userSearch: userSearch
    }
}