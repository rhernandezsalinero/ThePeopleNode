const JWT = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config')

const authJWT = {}
authJWT.createToken = (user) => {
    let exp_token = moment().add(7, 'days').unix()
    // current time + 7 day ahead
    return [
        JWT.sign({
            sub: user._id,
            iat: moment().unix(),
            exp: exp_token,
        }, config.secret),
        exp_token
    ]
}
module.exports = authJWT