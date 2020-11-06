'use strict';
var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');

var PORT  = process.env.PORT || 5000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var x = 11;
if(x<30){
    app.get('/', function (req, res) {
        res.render('index', {fname: 'aaa',lname : 'aaa'});
    });
}
else {
    app.get('/', function (req, res) {
        res.render('index1', {fname: 'aaa',lname : 'aaa'});
    });                                                      



}
app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`)
});


var resultFromRequest ; 
var stuID; 
var pass;

app.post('/api', function (req, res) {
        const queryParams = req.query;
        stuID = queryParams['stuID'];
        pass = queryParams['pass'];
        var options = {
          'method': 'POST',
          'hostname': 'restapi.tu.ac.th',
          'path': '/api/v1/auth/Ad/verify',
          'headers': {
              'Content-Type': 'application/json',
              'Application-Key': '{TUc038d055adcc6fcc2717c458eb10b427da293391b5a1f633a87a9699e57f919c97572cb365827845a28540a289978a04}'
          }
      };
      console.log(stuID+pass)
      var req = https.request(options, function (res) {
          var chunks = [];
      
          res.on("data", function (chunk) {
              chunks.push(chunk);
          });
      
          res.on("end", function (chunk) {
              resultFromRequest = Buffer.concat(chunks);
              console.log(resultFromRequest.toString());
          });
      
          res.on("error", function (error) {
              console.error(error);
          });
      });
      var postData =  "{\n\t\"UserName\":\"{"+stuID+"}\",\n\t\"PassWord\":\"{"+pass+"}\"\n}";
      req.write(postData);
      req.end();
      res.send(resultFromRequest);
      
}); /*
var options = {
    'method': 'GET',
     'hostname': 'restapi.tu.ac.th',
    'path': 'api/v2/profile/std/info/?id={6209610242}',
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
     // res.send(body);
    });
  
    res.on("error", function (error) {
      console.error(error);
    });

  });
  
  req.end();



    var options = {
            'method': 'POST',
            'hostname': 'restapi.tu.ac.th',
            'path': '/api/v1/auth/Ad/verify',
            'headers': {
                'Content-Type': 'application/json',
                'Application-Key': 'TUc038d055adcc6fcc2717c458eb10b427da293391b5a1f633a87a9699e57f919c97572cb365827845a28540a289978a04'
            }
        };
        console.log(stuID+pass)
        var req = https.request(options, function (res) {
            var chunks = [];
        
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
        
            res.on("end", function (chunk) {
                resultFromRequest = Buffer.concat(chunks);
                console.log(resultFromRequest.toString());
            });
        
            res.on("error", function (error) {
                console.error(error);
            });
        });
        var postData =  "{\n\t\"UserName\":\"{"+stuID+"}\",\n\t\"PassWord\":\"{"+pass+"}\"\n}";
        req.write(postData);
        req.end();
        res.send(resultFromRequest);
  
    
    /*
    const options1 = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/todos/1',
        method: 'GET',
        'headers': {
            'Content-Type': 'application/json',
        }
    };
    const req1 = http.request(options, response => {
        response.setEncoding('utf8');
        response.on('data', chunk => {
            console.log('data:' + chunk);
        });
    
        response.on('end', () => {
            console.log('end of GET request');
        });
    });
    
    req1.on('error', e => {
        console.log('Problem with request:', e.message);
    });
    req1.end();
    
     );
*/
  //  res.send(queryParams);
 


