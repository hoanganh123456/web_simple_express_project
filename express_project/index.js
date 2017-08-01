/**
 * Created by hoanganh on 31/07/2017.
 */
const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');
const nodemailer = require('nodemailer');

const  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));//su dung file public


app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

app.get("/",function (req,res) {
    res.render('index',{title : 'Welcome to express'});
})

app.get("/about",function (req,res) {
    res.render('about');
})
app.get("/contact",function(req,res){
    res.render('contact');
})
app.post("/contact/send",function (req,res) {
    let transporter = nodemailer.createTransport({
        // secure:true for port 465, secure:false for port 587
        service: 'gmail',
        auth: {
            user: 'dovuhoanganh123@gmail.com',
            pass: 'hamlongthapbatchuong'
        }
    });
    let name = req.body.name
    let email = req.body.email
    let message = req.body.message

    let mailOptions = {
        from: ' dovuhoanganh123@gmail.com ', // sender address
        to: 'dovuhoanganh2016@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ? Name : ' + name + 'Email : ' + email + 'Message : ' + message, // plain text body
        html: '<p>Hello world ? </p><ul><li>Name :' +name+'</li><li> Email :'+email+'</li><li> Message :'+message+'</li></ul>' // html body

    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            res.redirect('/');
        }
        else {
            console.log('Message %s sent: %s', info.messageId);
            res.redirect('/');
        }
    });

})

app.listen(5000);
console.log('Server is running on port 4000');
