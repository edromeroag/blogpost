module.exports = (req, res, next) => {
    const validationErrors = []

    if (req.files == null || req.body.title == '' || req.body.body == '') {
        if (req.files == null) {
            validationErrors.push('Please provide blog image')
        }
        if (req.body.title == '') {
            validationErrors.push('Please provide blog title')
        }
        if (req.body.body == '') {
            validationErrors.push('Please provide blog text')
        }
        req.flash('validationErrors', validationErrors)
        req.flash('data', req.body)
        return res.redirect('/posts/new')
    
    }
    next()
}