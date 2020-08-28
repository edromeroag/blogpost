const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) => {
    const {username, password} = req.body
    req.flash('data', req.body)
    User.findOne({username:username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {
                    req.session.userId = user._id
                    res.redirect('/')
                }
                else {
                    req.flash('validationErrors', 'Incorrect Password')
                    res.redirect('/auth/login')
                }
            })
        } 
        else {
            req.flash('validationErrors', 'Username could not be found. Please try again with a different username')
            res.redirect('/auth/login')
        }
    })
}