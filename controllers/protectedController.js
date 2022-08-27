

exports.protectedFunction = (scope) => {
    return function (req, res, next) {
        var has_scopes = req.auth.scope === scope;
        console.log(scope,req.auth.scope,has_scopes)
        if (!has_scopes) { 
            res.sendStatus(401); 
            return;
        }
        if(has_scopes){
            return res.status(200).send({
                "message": "token verified"
            })
        }
    };
}