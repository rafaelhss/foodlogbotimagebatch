var webshot = require('./lib/webshot');

webshot('globo.com', './amazon.png', function(err) {
  if (err) return console.log(err);
  console.log('OK');

	var request = require('request');
	var fs = require('fs');
	var url ='https://requestb.in/1k094v51'




	var BOT_ID = "380968235:AAGqnrSERR8ABcw-_avcPN2ES3KH5SeZtNM";
	var chat_id = "153350155";
	var UrlTemplate = "https://api.telegram.org/bot" + BOT_ID + "/sendPhoto?chat_id=" + chat_id;


	//fs.createReadStream('amazon.png').pipe(request.post(url))


	var formData = {
	  photo: fs.createReadStream('amazon.png')
	};
	request.post({url:UrlTemplate, formData: formData}, function optionalCallback(err, httpResponse, body) {
	  if (err) {
	    return console.error('upload failed:', err);
	  }
	  console.log('Upload successful!  Server responded with:', body);
	});

});


