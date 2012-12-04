
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function getInterestOption(seq) {
    var option = {
        host: 'cyrang.cyworld.com',
        path: '/if/get_interest',
        method: 'GET'
    };
    if (seq != null && seq != '') {
        option.path = '/if/get_interest?tocy_info=1&last_seq=' + seq;
    }
    console.log(option);
    return option;
}
function request(option, fn) {
    http.request(option, function(res) {
        var body ='';
        res.on('data', function(chunk) {
            body += chunk.toString('utf8');
        });
        res.on('end', function(chunk) {
            var jsonObj = JSON.parse(body);

            var nextSeq = jsonObj.result.set[0].seq;
            var itemCount = jsonObj.result.set[0].item_count;
            var items = jsonObj.result.set[0].item;

            console.log("next_seq : " + nextSeq);
            console.log("item_count : " + itemCount);

            return fn(nextSeq, items);
        });
        res.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });
    }).end();
}

app.get('/', function(req, res) {
    console.log(req.header('host'));
    res.redirect('/interest');
});
app.get('/interest', function(req, res) {
    console.log('Normal Access');
    request(getInterestOption(null), function(nextSeq, items) {
        res.render('interest', {title: "Cyrang Interest", list : items, seq: nextSeq});
    });
});
app.get('/interest/:seq', function(req, res) {
    var seq = req.params.seq;
    console.log('Requested seq: ' + seq);
    request(getInterestOption(seq), function(nextSeq, items) {
        res.render('interest', {title: "Cyrang Interest", list : items, seq: nextSeq});
    });
});
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
