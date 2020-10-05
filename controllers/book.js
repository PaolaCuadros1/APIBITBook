const Book = require('../models/book')

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Todos los campos son obligatoríos.'
        })
    }

    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        numberPages: req.body.numberPages,
        genre: req.body.genre,
        publsher: req.body.publsher,
    })

    book.save().then(
        data => {
            res.send(data)
        }
    ).catch(
        error => {
            res.status(500).send({
                message: error.message || 'Error al crear el libro'
            })
        }
    )
}

exports.getAll = (req, res) => {
    Book.find()
        .populate('genre')
        .exec()
        .then(books => {
            res.send(books)
        })
        .catch(error => {
            res.status(500).send({
                message: error.message || 'Error al obtener libros'
            })
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Todos los campos son obligatoríos.'
        })
    }

    const book = {
        name: req.body.name,
        author: req.body.author,
        numberPages: req.body.numberPages,
        genre: req.body.genre,
        publsher: req.body.publsher,
    }

    Book.findByIdAndUpdate(req.params.id, book, { new: true })
        .then(
            book => {
                res.send(book)
            }
        ).catch(error => {
            res.status(500).send({
                message: error.message || 'Error al actualizar el libro'
            })
        })
}

exports.deleteOne = (req, res) => {
    Book.findByIdAndRemove(req.params.id)
        .then(
            book => {
                res.send(book)
            }
        )
        .catch(
            error => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}

exports.getOne = (req, res) => {
    Book.findById(req.params.id)
        .populate('genre')
        .exec()
        .then(
            book => {
                res.send(book)
            }
        )
        .catch(
            error => {
                res.status(500).send({
                    message: error.message
                })
            }
        )
}