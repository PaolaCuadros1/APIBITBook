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