const  route=require('express').Router()
const passport=require('passport')
require("../auth")

function islogged(req,res,next){
    req.user ? next() : res.sendStatus(401)
}

route.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));


route.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/fail' }),
    function(req, res) {

res.redirect('/protect')
})

route.get('/fail',(req,res)=>{
    res.send("this is failure")
})

route.get("/protect",islogged,(req,res)=>{
    res.send(req.user)
})

route.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy()
      res.send('goodbye')
    });
  });
module.exports=route