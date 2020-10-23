module.exports = (app) => {
    const book = require('../controllers/book')
    let multipart = require('connect-multiparty');
    var uploadImage = multipart({ uploadDir: './assets/images' });
    app.post('/book/create', uploadImage, book.create)
    app.get('/book/getAll', book.getAll)
    app.put('/book/update/:id', uploadImage, book.update)
    app.get('/book/getOne/:id', book.getOne)
    app.get('/getImage', book.getImage)
}