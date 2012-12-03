
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , interest = require('./routes/interest')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
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

function cyrang_interest(seq, item_count, item) {
    this.seq = seq;
    this.item_count = item_count;
    this.items = items;
}

var option = {
    host: 'cyrang.cyworld.com',
    path: '/if/get_interest',
    method: 'GET'
};

var jsonItems;
function showItems(items) {
//    console.log("[showItems]" + JSON.stringify(items));
    jsonItems = items;
}

function get_interest (option, fn) {
    var request = http.request(option, function(res) {
        var body ='';
        res.on('data', function(chunk) {
            body += chunk.toString('utf8');
        });
        res.on('end', function(chunk) {
            var jsonObj = JSON.parse(body);

            var seq = jsonObj.result.set[0].seq;
            var item_count = jsonObj.result.set[0].item_count;
            var items = jsonObj.result.set[0].item;
//            console.log(items);
            console.log("next_seq : " + seq);
            console.log("item_count : " + item_count);
//        console.log("item : " + JSON.stringify(items));

            //http://cyrang.cyworld.com/if/get_interest?tocy_info=1&last_seq=281&t=1354173399340
            option = {
                host : 'cyrang.cyworld.com',
                path : '/if/get_interest?tocy_info=1&last_seq=' + seq,
                method : 'GET'
            }
            console.log(option);
            return fn(items);
        });

        res.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });
    });
    request.end();
};

//get_interest(option, showItems);

app.get('/', function(req, res) {
    res.redirect('/interest');
});
app.get('/test', function(req, res) {
    get_interest(option, showItems);
    res.render('test', {title : jsonItems});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
