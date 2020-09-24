const mongoose = require('mongoose')

const conectarDB = () => {
    mongoose.connect('mongodb://localhost:27017/BITBook', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
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