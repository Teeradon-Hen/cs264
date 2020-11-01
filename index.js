var https = require('https');

var options = {
  'method': 'GET',
'hostname': 'restapi.tu.ac.th',
  'path': '/api/v2/std/fac/all',
  'headers': {
    'Content-Type': 'application/json',
    'Application-Key': '{TUc038d055adcc6fcc2717c458eb10b427da293391b5a1f633a87a9699e57f919c97572cb365827845a28540a289978a04}'
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
