const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

Execute = require('./src/backend/ExecuteFile');


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


//Compile code
app.post('/compile', function (req, res, err) {
  var data = req.body;
  Execute.executeFile(res, data);
});



//Set port
const port = process.env.PORT || '1818';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
