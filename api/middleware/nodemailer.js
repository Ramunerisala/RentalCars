import nodemailer from 'nodemailer';
import express from 'express';

// var html=`
// <h1>Thank you for your registration.{username}</h1>
// <h2>Have a nice trip</h2>
// `;
var main=(username,email,html)=>{
    var newhtml=html.replace("{username}",username);
    var transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'vrprasadnerisala2001@gmail.com',
            pass:'wzvmilfxiaqkoykv'
        },
        connectionTimeout: 30000, // 30 seconds
        socketTimeout: 30000 

    });
     transporter.sendMail({
        from:'vrprasadnerisala2001@gmail.com',
        to:email,
        subject:'About Registration',
        html:newhtml
            
     },(err,info)=>{
        if(err){console.log(err);}
        else{console.log(info);}
     });
     

};
export default main;