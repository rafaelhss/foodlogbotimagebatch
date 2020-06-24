var webshot = require('./lib/webshot');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('foodloghost', (process.env.FOODLOGHOST || 'http://foodlogbot2adm.herokuapp.com/foodlog'))



app.get('/weight', function (req, res) {

    var options2 = {
        screenSize: {
            width: 1000
          , height: 480
        }, 
        shotSize: {
            width: 'all'
          , height: 'all'
        }, /*
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
            */
        renderDelay: 20000
    };


    var url = app.get('foodloghost') + '/weight/index.html?userid='+req.query.userid + "&auth-token=" + req.query['auth-token'];
    
    var filename = 'report'+req.query.userid +'.png';
    
    sendShot(url ,filename, options2, req.query['usertelegram']);
    res.sendStatus(200)

});


app.get('/evolution', function (req, res) {

    var options2 = {
        screenSize: {
            width: 1000
          , height: 480
        },
        shotSize: {
            width: 'all'
          , height: 'all'
        }, /*
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
            */
        renderDelay: 20000
    };


    var url = app.get('foodloghost') + '/evolution/index.html?userid='+req.query.userid + "&auth-token=" + req.query['auth-token'];

    var filename = 'report'+req.query.userid +'.png';

    sendShot(url ,filename, options2, req.query['usertelegram']);
    res.sendStatus(200)

});

app.get('/bodylog', function (req, res) {

    var options2 = {
        screenSize: {
            width: 320
          , height: 480
        }, 
        shotSize: {
            width: 'all'
          , height: 'all'
        }, /*
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
            */
        renderDelay: 20000
    };

    var url = app.get('foodloghost') + '/bodylog/index.html?image-type=panel&userid='+req.query.userid + "&auth-token=" + req.query['auth-token'];
    
    var filename = 'body'+req.query.userid +'.png';
    
    sendShot(url ,filename, options2, req.query['usertelegram']);
    
    res.sendStatus(200)

});


app.get('/timeline', function (req, res) {

    var options2 = {
        screenSize: {
            width: 300/*
          , height: 667*/
        }, 
        shotSize: {
            width: 'all'
          , height: 'all'
        }, /*
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
            */
        renderDelay: 20000
    };


    var url = app.get('foodloghost') + '/timeline/index.html?utcOffset=-3&userid='+req.query.userid + "&auth-token=" + req.query['auth-token'];
    
    var filename = 'time'+req.query.userid +'.png';
    
    sendShot(url ,filename, options2, req.query['usertelegram']);

    res.sendStatus(200)

});



app.listen(app.get('port'), function () {
  console.log('Servidor iniciado na porta ' + app.get('port'));
});


function sendShot(url, fileName, options, usertelegram) {  
	
	console.log(' @@@x@@@ url:' + url);

        webshot(url, './' + fileName, options, function(err) {
          if (err) { 
                res.send(err);
                return console.log(err);
          }
          console.log('OK3:  ' + fileName);

            var request = require('request');
            var fs = require('fs');
            



            var BOT_ID = "1197511596:AAGeb1HFGUUMPuDjn_vNFx9CeOZ83gNluPo    ";
            var chat_id = usertelegram;//"153350155";
            var UrlTemplate = "https://api.telegram.org/bot" + BOT_ID + "/sendPhoto?chat_id=" + chat_id;
	    var UrlTextTemplate = "https://api.telegram.org/bot" + BOT_ID + "/sendmessage?chat_id="+ chat_id + "&text=" + encodeURIComponent(url);


            //fs.createReadStream('amazon.png').pipe(request.post(url))

            console.log(UrlTemplate)
            console.log(UrlTextTemplate)


            var formData = {
              photo: fs.createReadStream(fileName)
            };
            
	    request.post({url:UrlTemplate, formData: formData}, function optionalCallback(err, httpResponse, body) {
              if (err) {
                return console.error('upload failed:', err);
              }
              console.log('Upload successful!  Server responded with:', body);
            });

	    request.get(UrlTextTemplate, function optionalCallback(err, httpResponse, body) {
              if (err) {
                return console.error('upload failed:', err);
              }
              console.log('Upload text successful!  Server responded with:', body);
            });

	    

        });
    }






