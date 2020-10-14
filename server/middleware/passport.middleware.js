const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const config = require('../config')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

module.exports = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId).select('email id')
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  } catch (e) {
    console.log(e)
    done(e, false)
  }
})