const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "recovery password",
        html: `
              <h1>Did You forget the password?</h1>
              <p>If no to ignore this message</p>
              <p>Otherwise click the link:</p>
              <p><a href="${keys.BASE_URL}/auth/password/${token}">recovery access</a></p>
              <hr/>
        `
    }
}