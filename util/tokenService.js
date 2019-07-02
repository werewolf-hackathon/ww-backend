const jwt = require('jsonwebtoken')

const secrets = require('../secret.js')

module.exports = user => {
    const payload = {
        subject: user.id,
        email: user.email
    }

    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}