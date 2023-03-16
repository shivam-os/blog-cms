const User = require("../models/user");
require("dotenv").config();

//Import Strategy class from passport-jwt
const JwtStrategy = require("passport-jwt").Strategy;

//Import ExtractJWT class from passport-jwt which defines methods to extract jwt from the http header
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    //Get the userId from payload after verifying the jwt
    const existingUser = await User.findOne( {attributes: ["id", "name"]}, { where: {id: payload.userId} });

    //If user found, attach user to req object otherwise return false
    if (existingUser) {
      return done(null, existingUser);
    } else {
      return done(null, false);
    }
  } catch (err) {

    //If error occurs, pass error to req object and null as the user
    done(err, null);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
