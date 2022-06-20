const  route=require('express').Router()
const user=require("../model/user")
const  bcrypt=require('bcrypt')
var error=0;
route.post('/login',(req,res)=>{
    console.log(req.body)
    user.findOne({username:req.body.username})
    .then((result)=>{
        
        if(result===null)
        {
            res.sendStatus(400)
        }
        else{
            bcrypt.compare(req.body.password,result.password,(err,resu)=>{
                if(err){error=error+1}
                if(resu==false){error=error+1}
                console.log(result)
                console.log(error)
            if(error>0)
            {       error=0
                    res.sendStatus(400)          }
            else{
                console.log('api send')
                res.send(result)
            }
                
            })
            
            
        }
    })
})



module.exports=route