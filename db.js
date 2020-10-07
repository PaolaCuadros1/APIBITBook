const mongoose = require('mongoose')
const config = require('./config')

const conectarDB = () => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect('mongodb+srv://userAdminBook:testBITBook@proyectobit.3pvug.mongodb.net/BITBook?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        if (error) {
            console.log('Error ', error)
        } else {
            console.log('Nos conectamos')
        }
    })
}

const algo = () => {

}

module.exports = { conectarDB, algo }