const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const http = require('http');
const router  = express.Router();
const userRoutes = require('./routes/userRoutes');
const protectedRoute = require('./routes/protectedRoute');
const app = express()

dotenv.config()


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user",userRoutes)
app.use("/protected",protectedRoute)

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});