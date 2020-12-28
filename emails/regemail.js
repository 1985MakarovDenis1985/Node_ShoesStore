const keys = require('../keys')

module.exports = function (email, name) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: 'registration was successful',
        html: `
              <h1>Welcome to store ${name}</h1>
              <p>Your account was created with success</p>
              <hr/>
              
              <a href="${keys.BASE_URL}">Go to store</a>
        `
    }
}