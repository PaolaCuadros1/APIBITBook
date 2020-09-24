const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise
const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('Genre', genreSchema)