const Genre = require('../models/genre')

/**
 * Este método permite almacenar los generos que tendrá la librería
 * @param {*} req  => Todo lo que yo estoy recibiendo.
 * @param {*} res  => La respuesta que da mi método
 */
exports.create = (req, res) => {
    /**
     * Si el body es vacío, entonces....
     */
    if (!req.body.name) {
        return res.status(400).send({
            message: 'El genero no puede estar vacío'
        })
    }

    const genre = new Genre({
        name: req.body.name
    })

    genre.save().then(data => {
        res.send(data)
    }).catch(error => {
        res.status(500).send({
            message: error.message || 'Error al crear el genero'
        })
    })



}

exports.update = (req, res) => {
    const genre = {
        name: req.body.name
    }

    Genre.findByIdAndUpdate(req.params.id, genre, { new: true })
        .then(
            genre => {
                res.send(genre)
            }
        )
        .catch(
            error => {
                res.status(500).send({
                    message: error.message || 'Error'
                })
            }
        )
}

exports.getAll = (req, res) => {
    Genre.find()
        .then(
            genres => {
                res.send(genres)
            }
        )
        .catch(
            error => {
                res.status(500).send({
                    message: error.message || 'Error'
                })
            }
        )
}

exports.deleteOne = (req, res) => {
    Genre.findByIdAndRemove(req.params.id)
        .then(
            genre => {
                res.send(genre)
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