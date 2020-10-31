'use strict';
var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');

var PORT  = process.env.PORT || 5000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {fname: 'Thycha a3ตัว',lname : 'เด็กเปรต'});
});

app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`)
});

app.get('/api', function (req, res) {
    const queryParams = req.query;
    console.log('param[1]:' + queryParams['user']);
    res.send(queryParams);
});


/*

var options = {
    'method': 'POST',
    'hostname': 'restapi.tu.ac.th',
    'path': '/api/v1/auth/Ad/verify',
    'headers': {
        'Content-Type': 'application/json',
        'Application-Key': 'TUc038d055adcc6fcc2717c458eb10b427da293391b5a1f633a87a9699e57f919c97572cb365827845a28540a289978a04'
    }
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});


var options = {
    'method': 'GET',
    'hostname': 'restapi.tu.ac.th',
    'path': '/api/v2/std/fac/all',
    'headers': {
        'Content-Type': 'application/json',
        'Application-Key': 'TUc038d055adcc6fcc2717c458eb10b427da293391b5a1f633a87a9699e57f919c97572cb365827845a28540a289978a04'
    }
};

var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });

    res.on("error", function (error) {
        console.error(error);
    });
});

req.end();

*/
const options = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/todos/1',
    method: 'GET',
    'headers': {
        'Content-Type': 'application/json',
    }
};
const req = http.request(options, response => {
    response.setEncoding('utf8');
    response.on('data', chunk => {
        console.log('data:' + chunk);
    });

    response.on('end', () => {
        console.log('end of GET request');
    });
});

req.on('error', e => {
    console.log('Problem with request:', e.message);
});
req.end();

