var http = require("http");
var fs = require("fs");

var option = {
    host: 'cyrang.cyworld.com',
    path: '/if/get_interest',
    method: 'GET'
}

var request = http.request(option, function(res) {
    var body ='';
    res.on('data', function(chunk) {
        body += chunk.toString('utf8');
    });
    res.on('end', function(chunk) {
        var jsonObj = JSON.parse(body);
        console.log(JSON.stringify(jsonObj));
    });
    
});
request.end();