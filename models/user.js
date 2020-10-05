const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    role: { type: String, required: true },
})

module.exports = mongoose.model('User', userSchema)