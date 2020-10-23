const Book = require('../models/book')
let fs = require('fs');
const path = require('path');

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Todos los campos son obligatoríos.'
        })
    }

    let routeFile = req.files.image.path
    let splitFile = routeFile.split('images');
    imageFile = splitFile[splitFile.length - 1].replace('/', '').replace('\\', '');

    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        numberPages: req.body.numberPages,
        genre: req.body.genre.split(','),
        publsher: req.body.publsher,
        image: imageFile,
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
    let imageFile = req.body.image
    if(req.files.image){
        let routeFile = req.files.image.path
        let splitFile = routeFile.split('images');
        imageFile = splitFile[splitFile.length - 1].replace('/', '').replace('\\', '');
    }

    const book = {
        name: req.body.name,
        author: req.body.author,
        numberPages: req.body.numberPages,
        genre: req.body.genre.split(','),
        publsher: req.body.publsher,
        image: imageFile,
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

exports.getImage = (req, res) => {
    const image = req.query.image ? req.query.image : 'Book.jpg'
    console.log('image ---> ', image)
    const imageRoute = './assets/images/' + image;
    fs.exists(imageRoute, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(imageRoute))
        } else {
            res.status(404).send({
                statusCode: 404,
                message: 'La imagen no existe'
            });
        }
    });

}