const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { conectarDB } = require('./db')
const port = process.env.PORT || 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

conectarDB()
require('./routes/genre')(app)
require('./routes/book')(app)
require('./routes/user')(app)

app.listen(port, () => {
    console.log('Servidor levantador correctamente')
})