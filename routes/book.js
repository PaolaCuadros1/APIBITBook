module.exports = (app) => {
    const book = require('../controllers/book')
    app.post('/book/create', book.create)
    app.get('/book/getAll', book.getAll)
    app.put('/book/update/:id', book.update)
    app.get('/book/getOne/:id', book.getOne)
}