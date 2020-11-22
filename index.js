'use strict';
var express = require('express');
var path = require('path');
var https = require('https');
var bodyParser = require('body-parser');
var http = require('http');
const { response, request } = require('express');
const { compile } = require('ejs');
const { resolve } = require('url');

var PORT  = process.env.PORT || 5000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use( express.static( "public" ));

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

app.get('/', function (req, res) {
  res.render('Home');

});

app.get('/List', function (req, res) {
  res.render('List');

});

app.get('/Home', function (req, res) {
  res.render('Home');

});