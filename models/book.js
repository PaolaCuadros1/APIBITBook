const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    numberPages: { type: Number },
    //genre: { type: String, required: true },
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
    publsher: { type: String, required: true }
})

module.exports = mongoose.model('Book', bookSchema)