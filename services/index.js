const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'miTokenSecretoBITBook'
const algoritm = 'HS256'

// 2020-10-05 00:00:00 => 523698541 

exports.createToken = (dataUser) => {
    const payload = {
        sub: dataUser._id,// Identificación del usuario
        iat: moment().unix(), //Fecha de creación del token
        exp: moment().add('1', 'hour').unix(), //Fecha de expiración del token
        firstName: dataUser.firstName,
        lastName: dataUser.lastName,
        email: dataUser.email,
        birthDate: dataUser.birthDate,
        role: dataUser.role,
    }
    /**
     * payload => Datos del usuario y fechas.
     * secret => Firma del token
     * algoritm => Es opcional y es el algoritmo de encriptación
     */
    return jwt.encode(payload, secret, algoritm)
}

exports.decodeToke = (toke) => {
    const decode = new Promise( (resolve, reject) => {
        try{
            const payload = jwt.decode(toke, secret, algoritm)
            if (payload.exp <= moment().unix() ){
                reject({
                    status: 401,
                    message: 'El token expiró'
                })
            }
            resolve(payload)
        }catch{
            reject({
                status: 500,
                message: 'El token es invalido'
            })
        }
    } )
    return decode
}