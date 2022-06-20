const  route=require('express').Router()
const faq=require("../model/faq")
const user=require('../model/user')
const nodemailer=require("nodemailer")

route.post('/ask',(req,res)=>{
    console.log('IN ASK')
    const faq_data=new faq({
        "question_username":req.body.question_username,
        "question":req.body.question
    })
    faq_data.save()
    res.send('question asked')
})
route.post('/fetch',(req,res)=>{
    console.log('in fetch')
    faq.find({is_answered:'0'}).limit(3)
    .then((result)=>{
            res.send(result)
    })

})


route.post('/add_ans',(req,res)=>{
    console.log(req.body)
    faq.findByIdAndUpdate(req.body.id,{answer:req.body.answer,is_answered:'1',answer_lawyername:req.body.answer_lawyername},(err,result)=>{
        if (err){
        console.log(err)
             }
    else


    {   console.log(result)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'ragulaids@smvec.ac.in',
              pass:'aidssmvec',
            },
          });
          
          let mailOptions = {
            from: 'ragulaids@smvec.ac.in',
            to: result.email,
            subject: `Reset Password Link`,
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
           
          };
          
          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.json(err);
            } else {
              
              req.flash('info', 'Email has sent to your mail')
              return res.redirect('/forgot');
            }
          });
        res.send('updated sucessfully')
    }

    })
})

route.post('/view_ans',(req,res)=>{
    
    faq.findOne({question_username:req.body.username,is_answered:'1',is_viewed:'0'})
    .then((result)=>{
        if(result==null)
        {   console.log('in  view')
            res.status(400).send('no_answers')
        }
        else{
            result.is_viewed='1'
            result.save()
            res.send(result)
        }
       

    })
})

route.post('/contact',(req,res)=>{
    user.findOne({username:req.body.username})
    .then((result)=>{
        if(result==null)
        {   console.log('in contact')
            res.status(400).send('no user found')

        }
        else{
            res.send(result)
        }
    })
})
module.exports=route