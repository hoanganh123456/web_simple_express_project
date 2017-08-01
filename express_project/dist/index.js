'use strict';

/**
 * Created by hoanganh on 31/07/2017.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); //su dung file public


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/", function (req, res) {
    res.render('index', { title: 'Welcome to express' });
});

app.get("/about", function (req, res) {
    res.render('about');
});
app.get("/contact", function (req, res) {
    res.render('contact');
});
app.post("/contact/send", function (req, res) {
    var transporter = nodemailer.createTransport({
        // secure:true for port 465, secure:false for port 587
        service: 'gmail',
        auth: {
            user: 'dovuhoanganh123@gmail.com',
            pass: 'hamlongthapbatchuong'
        }
    });
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;

    var mailOptions = {
        from: ' dovuhoanganh123@gmail.com ', // sender address
        to: 'dovuhoanganh2016@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ? Name : ' + name + 'Email : ' + email + 'Message : ' + message, // plain text body
        html: '<p>Hello world ? </p><ul><li>Name :' + name + '</li><li> Email :' + email + '</li><li> Message :' + message + '</li></ul>' // html body

    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
            res.redirect('/');
        } else {
            console.log('Message %s sent: %s', info.messageId);
            res.redirect('/');
        }
    });
});

app.listen(5000);
console.log('Server is running on port 4000');
//# sourceMappingURL=index.js.map