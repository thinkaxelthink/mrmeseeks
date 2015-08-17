var express = require('express'),
    bodyParser = require('body-parser'),
    yaml_config = require('node-yaml-config'),
    config = yaml_config.load(__dirname + '/config.yml'),
    wfrm = require('wolfram'),
    wolfram,
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


wolfram = wfrm.createClient(config.wolfram.app_id);

app.get('/', function(request, response) {
//    if(request.token === config.slack.token){
        response.send('Hello There!');
//    }
});

app.post('/cmd', function(request, response) {
    //wolfram.query()
    console.log(request.body.text.replace(/\/mrmeeseeks /, ''));
    if(request.body.token === config.slack.token){
        wolfram.query(request.body.text.replace(/\/mrmeeseeks /, ''),function(err, result){
            console.log('fafdafsf',JSON.stringify(result));
        });
        response.json(buildResponse(
            'Hi ' + request.body.user_name + ', I\'m Mr. MeeSeeks Look at me!'
        ));
    }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


//utility functions
//
///*
//* Helper function to build the JSON to send back to Slack.
//* Make sure to make a custom emoji in your Slack integration named :pkmntrainer:
//* with the included pkmntrainer jpeg, otherwise the profile picture won't work.
//*/
function buildResponse(text, to_string) {
    var json = {
        "text": text,
        "username": "Mr. Meeseeks",
        "icon_emoji": ":mrmeeseeks:"
    };

    return to_string ? JSON.stringify(json) : json;
}
