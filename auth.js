const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;


passport.use(new GoogleStrategy({
    clientID: '131774632716-melochoe2rl0u0amqntahfso88humn8k.apps.googleusercontent.com'
    ,
    clientSecret: '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',
    callbackURL: "http://localhost:3232/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null,profile,accessToken,refreshToken)
  }
));

passport.serializeUser((user,done)=>{
    
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    
    done(null,user)
})