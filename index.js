var webshot = require('./lib/webshot');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));


app.get('/', function (req, res) {
    
    var options = {
       /* screenSize: {
            width: 320
          , height: 480
        },*/ 
        shotSize: {
            /*width: 320
          , */height: 'all'
        }, /*
        userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us)'
            + ' AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g',
            */
        renderDelay: 5000
    };


    sendShot('http://foodlogbotonlinereports.herokuapp.com?utcOffset=-3','weight.png');
    sendShot('http://foodlogbotonlinereports.herokuapp.com/timeline/index.html?utcOffset=-3','timeline.png');

    function sendShot(url, fileName) {    

        webshot(url, './' + fileName, options, function(err) {
          if (err) { 
                res.send(err);
                return console.log(err);
          }
          console.log('OK:  ' + fileName);

            var request = require('request');
            var fs = require('fs');
            var url ='https://requestb.in/1k094v51'




            var BOT_ID = "380968235:AAGqnrSERR8ABcw-_avcPN2ES3KH5SeZtNM";
            var chat_id = "153350155";
            var UrlTemplate = "https://api.telegram.org/bot" + BOT_ID + "/sendPhoto?chat_id=" + chat_id;


            //fs.createReadStream('amazon.png').pipe(request.post(url))


            var formData = {
              photo: fs.createReadStream(fileName)
            };
            request.post({url:UrlTemplate, formData: formData}, function optionalCallback(err, httpResponse, body) {
              if (err) {
                return console.error('upload failed:', err);
              }
              console.log('Upload successful!  Server responded with:', body);
            });

        });
    }

});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!');
});





