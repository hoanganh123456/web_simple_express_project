# web_simple_express_project

## Giới thiệu:
Để làm được đồ án này cần cài express,path,body-paser,jade (template engine),nodemailer
Trong đồ án này ta sẽ làm 3 trang là : home,about,contact đơn giản.
##  Cách chạy ví dụ :
* git clone https://github.com/hoanganh123456/web_simple_express_project.git
* npm i 
* npm index
## Các bước thực hiện:
* B1 : Cài đặt npm i 4 cái trên.
* B2 : Ta sẽ require các modul đã cài đặt:

```script
    const express = require('express');
    const path = require('path');
    const bodyParser= require('body-parser');
    const nodemailer = require('nodemailer');
    
    const  app = express();
```
* B3 : Tạo thư mục :public(dùng để chứa các file css,js,...),views(dùng để chứa các file jade(file html,ejs,...)).
* B4 : Trong thư mục views ta sẽ tạo 4 file:
    * layout.jade : để chứa các dữ liệu chung như header,footer.
    * index.jade : chứa nội dung trang chủ.
    * about.jade.
    * contact.jade.
* B5 : Tạo file index.js để config:
    ```script
        app.use(bodyParser.json()); //lệnh này dùng để sử dụng body-parser
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(express.static(path.join(__dirname,'public')));//su dung file public
        
        
        app.set('views',path.join(__dirname,'views')); lệnh này dùng để cài đặt đường dẫn đến thư mục views khi mình dùng lệnh này thì router chỉ cần để đúng tên file là sẽ mặc định vào thư mục views mà ko cần phải khai báo đường dẫn
        app.set('view engine','jade');//lệnh này dùng để sử dụng template engine
        
        //Đây là nhưng lệnh đưa ra màn mình khi client yêu cầu nó sẽ trả về
        app.get("/",function (req,res) {
            res.render('index',{title : 'Welcome to express'});
        })
        
        app.get("/about",function (req,res) {
            res.render('about');
        })
        app.get("/contact",function(req,res){
            res.render('contact');
        })
     ```   
* B6 : Tạo nội dung html các bạn vào trang boostrap phần getting started chọn example chọn template jumbutton sau đó bạn copy về rồi vào trang  http://html2jade.org/ để chuyển html sang jade và paste nó vào file layout sau đó tìm đến phần nội dung chính và cut nó bỏ vào file index.
   * Chú ý cần thêm lệnh block content vào trang layout,ở nhưng trang con thì thêm block content + extands layout(như kiểu kế thừa lại nhưng thuộc tính của file cha vậy).
   * Các trang còn lại làm tương tự.
* B7 : Tạo from gửi mail sử dụng nodemail:
    ```script
         form(method='post', action='contact/send')
                .form-group
                    label Name
                    input#exampleInputName2.form-control(type='text', placeholder='Hoang Anh',name='name')
                .form-group
                    label Email address
                    input#exampleInputEmail1.form-control(type='email', placeholder='Email',name='email')
                .form-group
                    label Message
                    textarea.form-control(type='text', placeholder='Message',name='message')
                 button.btn.btn-default(type='submit') Submit
    ```
* B8 : Thêm code cho file index:
    ```script
        app.post("/contact/send",function (req,res) {
            let transporter = nodemailer.createTransport({
                // secure:true for port 465, secure:false for port 587
                service: 'gmail',
                auth: {
                    user: 'dovuhoanganh123@gmail.com', //địa chỉ mail server
                    pass: 'hamlongthapbatchuong'
                }
            });
            let name = req.body.name
            let email = req.body.email
            let message = req.body.message
        
            let mailOptions = {
                from: ' dovuhoanganh123@gmail.com ', // sender address
                to: 'dovuhoanganh2016@gmail.com', // list of receivers //gmail của khách hàng
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
    ```
    
B9 : Chạy file và hưởng thụ thành quả.    
