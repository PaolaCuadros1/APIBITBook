const User = require('../models/user')
const crypto = require('crypto')
const bcript = require('bcryptjs')
const jwtServi = require('../services/index')
const config = require('../config')

/**
 * El algoritmo md5
 * 123456789 => fdfd856df45df1fd54fd5
 * 
 * 123456789
 * 
 * crypto
 * 123456789 + dfdfdfvfvfvfvfvfvfvfvfvfv + 7787dfd7fd8f7d8f7d8f => t8t7g87tg854t5g4t8gt7
 */
const key = config.key
const iv = config.iv

let encrypt = (password) => {
    let chiper = crypto.createCipheriv('aes-256-cbc', key, iv)
    let pass = chiper.update(password, 'utf8', 'hex')
    pass += chiper.final('hex')
    return pass
}

exports.create = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: 'Todos los campos son obligatoríos.'
        })
    }

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //password: encrypt(req.body.password),
        password: bcript.hashSync(req.body.password),
        birthDate: req.body.birthDate,
        role: req.body.role
    })

    user.save()
    .then(
        dataUser => {
            res.send(dataUser)
        }
    )
    .catch(
        error => {
            res.status(500).send({
                message: error.message
            })
        }
    )
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email }, (error, dataUser) => {
        if(dataUser != null){
            //encrypt(req.body.password) == dataUser.password Con crypto
            if ( bcript.compareSync(req.body.password, dataUser.password) ){
                res.send({ toke: jwtServi.createToken(dataUser) })
            }else{
                return res.status(400).send({ message: 'Los datos no coinciden' })
            }
        }else{
            return res.status(400).send({ message: 'Por favor registrare en nuestra plataforma'})
        }
    })
}

exports.update = (req, res) =>{
    if (!req.body) {
        return res.status(400).send({
            message: 'Todos los campos son obligatoríos.'
        })
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthDate: req.body.birthDate,
        password: bcript.hashSync(req.body.password),
    }

    User.findByIdAndUpdate(req.params.id, user, {new: true})
    .then (
        dataUser => {
            res.send(dataUser)
        }
    ).catch(
        error => {
            res.send(500).send({
                message: error.message
            })
        }
    )
}