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
var status;
var username;
var nameTH;
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
var TotalCredit ;
var sub1;
var sub2;
var sub3;
var sub4;
var sub5;
var sub6;
var sub7;
var sub8;
var link;
var reasonReject;
app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});

app.get('/', function (req, res) {
  res.render('List');

});

app.get('/List', function (req, res) {
  res.render('List');

});


app.get('/acc', function (req, res) {
 status = true ;
  res.render('Success');

});
app.get('/rej', function (req, res) {
  status = false;
  res.render('reject');

});

app.post('/rejss', function (req, res) {
  reasonReject = req.body.reasonReject;
  res.render('Success');

});
app.get('/stu2', function (req, res) {
  username = '6209610242';
  nameTH = 'ธีรดนย์ เห็นใจชน';
  email = 'teeradon.hen@dome.tu.ac.th';
  department = 'วิทยาการคอมพิวเตอร์';
  faculty = 'วิทยาศาสตร์และเทคโนโลยี';
  stuTel = '08846023xx';
  stuYear = '2';
  parentTel = '081853xxxx';
  address = 'อ.เมือง จ.ลพบุรี 15000';
  teacher = 'รองศาสตราจารย์ ดร.เยาวดี เต็มธนาภัทร์';
  reason = 'มีปัญหาด้านสุขภาพ';
  noSub = '2';
  sub1  = ' CS213 SECTION 050001 3 หน่วยกิต';
  sub2  = ' CS221 SECTION 040001 3 หน่วยกิต';
  sub3 = '';
  sub4 = '';
  sub5 ='';
  TotalCredit = '6';
  link='';
  res.render('คำร้องนศ',{ username  , nameTH  , email
    , department   , faculty   , stuTel   , stuYear   , parentTel   , address   , teacher
    , reason  , noSub  , TotalCredit    , sub1   , sub2   , sub3   , sub4    , sub5    , sub6  ,link  , sub7 , sub8});

});
app.get('/stu3', function (req, res) {
  username = '6209610374';
  nameTH = 'ธิชาพร กระแจะจันทร์';
  email = 'thichaporn.kra@dome.tu.ac.th';
  department = 'วิทยาการคอมพิวเตอร์';
  faculty = 'วิทยาศาสตร์และเทคโนโลยี';
  stuTel = '08055710xx';
  stuYear = '2';
  parentTel = '080972xxxx';
  address = 'อ.เมือง จ.สมุทรสาคร 74000';
  teacher = 'อาจารย์ ดร.ปกป้อง ส่องเมือง';
  reason = 'นอนตื่นสาย';
  noSub = '5';
  sub1  = ' CS213 SECTION 050001 3 หน่วยกิต';
  sub2  = ' CS221 SECTION 040001 3 หน่วยกิต';
  sub3  = ' CS264 SECTION 100001 3 หน่วยกิต';
  sub4  = ' CS245 SECTION 870001 3 หน่วยกิต';
  sub5  = ' CS102 SECTION 020001 3 หน่วยกิต'; 
  TotalCredit = '15';
  link = 'https://drive.google.com/file/d/14KBTWk5Gmed5c2wxL6IrIsTFuFtwhXCf/view';
  res.render('คำร้องนศ',{ username  , nameTH  , email
    , department   , faculty   , stuTel   , stuYear   , parentTel   , address   , teacher
    , reason  , noSub  , TotalCredit    , sub1   , sub2   , sub3   , sub4    , sub5   ,link , sub6    , sub7 , sub8});
});
app.get('/stu1', function (req, res) {
  username = '6209610077';
  nameTH = 'อภิชญา ตันตินีรนาท';
  email = 'apichaya.tant@dome.tu.ac.th';
  department = 'วิทยาการคอมพิวเตอร์';
  faculty = 'วิทยาศาสตร์และเทคโนโลยี';
  stuTel = '08182932xx';
  stuYear = '2';
  parentTel = '086039xxxx';
  address = 'เขตทวีวัฒนา จ.กรุงเทพฯ 10170';
  teacher = 'รองศาสตราจารย์ ดร.เสาวลักษณ์ วรรธนาภา';
  reason = 'ขี้เกียจ';
  noSub = '3';
  sub1  = ' CS213 SECTION 050001 3 หน่วยกิต';
  sub2  = ' CS221 SECTION 040001 3 หน่วยกิต';
  sub3  = ' CS264 SECTION 100001 3 หน่วยกิต';
  sub4 = '';
  sub5 ='';
  TotalCredit = '9';
  res.render('คำร้องนศ',{ username  , nameTH  , email
    , department   , faculty   , stuTel   , stuYear   , parentTel   , address   , teacher
    , reason  , noSub  , TotalCredit    , sub1   , sub2   , sub3   , sub4    , sub5  ,link  , sub6    , sub7 , sub8});

});

app.get('/noti', function (req, res) {
  var noti;
  if(status==true){
    noti = 'Accept✔️✔️';
    reasonReject ='';
  }
  else if(status==false){
    noti = 'Reject 🙅🏻‍♂🙅🏻‍♂';
    reasonReject = 'เนื่องจาก ' + reasonReject ;
  }
  res.render('noti',{noti,reasonReject,username});

});
app.get('/info', function (req, res) {
  res.render('info',{ username  , nameTH  ,          email
    , department   , faculty   , stuTel   , stuYear   , parentTel   , address   , teacher
    , reason  , noSub  , TotalCredit    , sub1   , sub2   , sub3   , sub4    , sub5    , sub6  ,link  , sub7 , sub8});

});

app.get('/home', function (req, res) {
  res.render('Home',{username});

});