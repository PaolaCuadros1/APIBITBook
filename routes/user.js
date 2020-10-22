module.exports = (app) => {
    const user = require('../controllers/user')
    const auth = require('../middleware/auth')
    app.post('/user/create', user.create)
    app.post('/login', user.login)
    app.put('/user/update/:id', user.update)
}