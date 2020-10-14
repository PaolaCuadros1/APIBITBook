/**
POST => Registrar información o iniciar sesión
GET => Para obtener información.
PUT => Modificar información.
DELETE => Eliminar información.
*/

module.exports = (app) => {
    const genre = require('../controllers/genre')
    app.post('/genre/create', genre.create)
    app.delete('/genre/deleteOne/:id', genre.deleteOne)
    app.get('/genre/getAll', genre.getAll)
}