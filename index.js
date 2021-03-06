var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var app = express()


// start app at port 5000
app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function (req, res) {
	res.send('hello world i am a secret bot 3')
})

// for facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		console.log('webhook get is happening', req);
		res.send(req.query['hub.challenge'])
	}
	console.log('error wrong token');
	res.send('Error, wrong token')
})

// to post data
app.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;
								console.log('SENDER' , sender);
        if (event.message && event.message.text) {
            text = event.message.text;
            sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200));
        }
    }
    res.sendStatus(200)
})

var token = "EAAHDcdvZAfTABALAvgjUaFSgO5UrBIDemxPZCOHFhc7lj5eVrnJBx10R4SevW4ZCCEzswQ0hzWGZBPonGeLPUwX1PUlZB2JkuxhQZC1uzMZAp9wObZBZBUBysMHtQDvDBCqXI03IsLzgULqkZBJIJsZCzedwbp56JYOUknyGcZBHeps6WgZDZD"

function sendTextMessage(sender, text) {
	messageData = {
		text:text
	}
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {access_token:token},
		method: 'POST',
		json: {
			recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	})
}

// spin spin sugar
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})
