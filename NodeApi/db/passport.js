const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
// const mongoose = require("mongoose");
const User = require("../routes/api/users");
const index = require("../db/index");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = index.secretOrKey;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            })
            .catch(err => console.log('22222', err))

    }));
}