const mongoose = require('mongoose')
const config = require('./config')

const conectarDB = () => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
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