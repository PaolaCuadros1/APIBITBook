const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { conectarDB } = require('./db')

const app = express()
app.use(cors())
app.use(bodyParser.json())

conectarDB()
require('./routes/genre')(app)
require('./routes/book')(app)
require('./routes/user')(app)

app.listen(3000, () => {
    console.log('Servidor levantador correctamente')
})