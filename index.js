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
var reason;
var noSub;
var sub;
var ss;
app.get('/lateRegis', function (req, res){
    if( (day.getMonth() == 10 && day.getDate() >=5 ) || (day.getMonth() == 11 && day.getDate() <=5 ) ){
        res.render('lateRegistration',{ username ,nameTH, nameEN,  email , department ,  faculty});
    }
    else{
        res.render('late-display',{ username ,nameTH, nameEN,  email , department ,  faculty});       
    } 
   
});

app.get('/reason' , function (req, res){
    res.render('reason_And_Subject',{username,warnn:""});
});
app.get('/end' , function (req, res){
    res.render('end');
});
app.post('/checksub' , function (req, res){
    reason = req.body.reason; 
    noSub = req.body.noSub;
    sub = req.body.sub;
    var subarr;
    var TotalCredit  =0;
    subarr = sub.split(";");
    if(reason==1){
        reason = 'ปัญหาด้านการเงิน';
    }
    else if(reason==2){
        reason = 'ปัญหาด้านสุขภาพ';
    }
    for(var i = 0;i<subarr.length;i++){
        var arr = subarr[i].split("/"); 
        if(typeof arr[2] != "undefine"){
            TotalCredit = Number(TotalCredit) + Number(arr[2]);
            subarr[i] = (i+1)  + ".  "+ arr[0].toUpperCase() +"    SEC"+ arr[1] +"    " +arr[2] + " หน่วยกิต";
        }
    }
    var subarr0 = subarr[0];
    var subarr1 = subarr[1];
    var subarr2 = subarr[2];
    var subarr3 = subarr[3];
    var subarr4 = subarr[4];
    var subarr5 = subarr[5];
    var subarr6 = subarr[6];
    var subarr7 = subarr[7];
    var subarr8 = subarr[8];
    var subarr9 = subarr[9];
    var totalsub = subarr.length;
    console.log(TotalCredit);
    if( Number(TotalCredit) < 9){
        res.render('reason_And_Subject',{username , warnn : "จำนวนหน่วยกิตรวมมีน้อยกว่า 9 หน่วยกิต กรุณาลองใหม่อีกครั้ง"});
    }
    else if( Number(TotalCredit) > 22){
        res.render('reason_And_Subject',{username , warnn :"จำนวนหน่วยกิตรวมมากกว่า 22 หน่วยกิต กรุณาลองใหม่อีกครั้ง"});
    }
    else if ( Number(TotalCredit) < 22 &&  Number(TotalCredit) > 8){
        res.render('Check_reason_And_Subject',{ totalsub , TotalCredit , username , reason , noSub , subarr0 ,  subarr1,  subarr2 ,  subarr3 ,  subarr4 ,  subarr5 ,  subarr6 ,  subarr7 ,  subarr8 ,  subarr9    });
    }
});



app.post('/checkRegis' , function (req, res){
    stuYear = req.body.stuYear; 
    stuTel = req.body.stuTel;
    parentTel = req.body.parentTel;
    address = req.body.address;
    teacher = req.body.teacher;
    res.render('checkinfo',{ username ,nameTH, nameEN,  email , department ,  faculty,stuYear, stuTel , parentTel ,address ,  teacher});
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
        
       
       res.render('home',{ username ,nameTH, nameEN,  email , department ,  faculty });  

     }
    else if(typeof check == "string" && typeof check != "undefine"){
        res.render('login-intime', { warnn : 'You entered an incorrect username or password. Please try again'});   
                
    }
    
    
   //   res.send(resultFromRequest);
      
});  
    