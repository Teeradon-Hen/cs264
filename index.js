'use strict';
var express = require('express');
var path = require('path');
var https = require('https');
var bodyParser = require('body-parser');
var http = require('http');
const { response, request } = require('express');
const { compile } = require('ejs');

var PORT  = process.env.PORT || 5000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use( express.static( "public" ));

var day = new Date();

app.get('/', function (req, res) {
    res.render('login-intime', {warnn:""});

});
app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
});


var resultFromRequest ; 
var stuID; 
var pass;
var obj;
var check;
var username;
var nameTH;
var nameEN;
var email;
var department;
var faculty;
var stuTel;
var stuYear;
var parentTel;
var address;
var teacher;

app.get('/lateRegis', function (req, res){
    if( (day.getMonth() == 7 && day.getDate() >=13 ) || (day.getMonth() == 8 && day.getDate() <=13 ) ){
        res.render('lateRegistration',{ username ,nameTH, nameEN,  email , department ,  faculty});
    }
    else{
        res.render('late-display',{ username ,nameTH, nameEN,  email , department ,  faculty});       
    } 
   
});

app.post('/checkRegis' , function (req, res){
    stuYear = req.body.stuYear; 
    stuTel = req.body.stuTel;
    parentTel = req.body.parentTel;
    address = req.body.address;
    teacher = req.body.teacher;
    console.log(stuTel);
    res.render('checkinfo',{ username ,nameTH, nameEN,  email , department ,  faculty,stuYear, stuTel , parentTel ,address ,  teacher})
});
app.post('/auth', function (req, res) {
        const queryParams = req.query;
        stuID = req.body.stuID;
   
        pass = req.body.pass;
       // stuID = queryParams['stuID'];
       //  pass = queryParams['pass'];
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
      
          res.on("end", function (chunk ) {
              resultFromRequest = Buffer.concat(chunks);
              console.log(resultFromRequest.toString());
              console.log("Student ID : "+ stuID+ "   Password : " +pass)
              obj = JSON.parse(resultFromRequest);
              console.log(obj.status);
              
              check = obj.status;
              username = obj.username;
              nameTH = obj.displayname_th;
              nameEN = obj.displayname_en;
              email = obj.email;
              department = obj.department;
              faculty = obj.faculty;
   
          });
      
          res.on("error", function (error,res) {
              console.error(error);
           
          });
          

      });
    
      var postData =  "{\n\t\"UserName\":\""+stuID+"\",\n\t\"PassWord\":\""+pass+"\"\n}";
      req.write(postData);
      req.end();
    
          
      
      if(typeof check == "boolean" && typeof check != "undefine"){  
        res.render('home',{ username ,nameTH, nameEN,  email , department ,  faculty});  
      }
      else if(typeof check == "string" && typeof check != "undefine"){
        res.render('login-intime', { warnn : 'You entered an incorrect username or password. Please try again'});   
      }
    
   //   res.send(resultFromRequest);
      
});  
    