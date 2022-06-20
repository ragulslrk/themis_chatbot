const  route=require('express').Router()
const user=require("../model/user")
const  bcrypt=require('bcrypt')
var sucess=0;
route.post('/signup',(req,res)=>{
  console.log(req.body)
    const  phone=parseInt(req.body.phoneno);
    console.log(phone)
    user.findOne({username:req.body.username})
    .then((result)=>{
        if(result)
        {   
           
             res.status(400).send('already exists')
        }
        else{
                const  salt=bcrypt.genSalt(10)
                const pass=req.body.password.toString();
                bcrypt.hash(pass,parseInt(salt))
                .then((hash)=>{
                    const user_data=new user({
                        "username":req.body.username,
                        "password":hash,
                        "email":req.body.email,
                        "phoneno":phone,
                        "name":req.body.name,
                        "role":req.body.role
                    })
                    user_data.save()
                    sucess=sucess+1
                    if(sucess>0)
                      {
                        sucess=0
                        console.log('in sign')
                        res.send('created')
                        console.log("user created")
                      }
                      else{
                        res.status(404)
                      }
                      }
                      
                      )
                      

        .catch(err=>{
            res.send(err)})
            

        }
        
   })
   .catch(err=>{
       res.send(err)
   })


})




module.exports=route