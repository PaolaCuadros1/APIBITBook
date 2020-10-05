const service = require('../services/index')

exports.isAuth = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(400).send({ message: 'Debes iniciar sesión' })
    }

    const token = req.headers.authorization.split(' ')[1]
    service.decodeToke(token)
    .then(
        response => {
            req.user = response
            next()
        }
    )
    .catch(
        error => {
            res.status(error.status).send({ message: error.message })
        }
    )
}

/**
 * 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Zjc3Yjc5MmYwYjRhNjE0MTRlMWFlMzgiLCJpYXQiOjE2MDE2ODY1MjYsImV4cCI6MTYwMTY5MDEyNiwiZmlyc3ROYW1lIjoiWnVyaSIsImxhc3ROYW1lIjoiQWd1ZGVsbyIsInJvbGUiOiJBZG1pbiJ9.H0E9VAkO8CPzUAVrSSlLCNEuKsgnBnigcSMnxAZM2DQ'
 * 
 * ['Bearer', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Zjc3Yjc5MmYwYjRhNjE0MTRlMWFlMzgiLCJpYXQiOjE2MDE2ODY1MjYsImV4cCI6MTYwMTY5MDEyNiwiZmlyc3ROYW1lIjoiWnVyaSIsImxhc3ROYW1lIjoiQWd1ZGVsbyIsInJvbGUiOiJBZG1pbiJ9.H0E9VAkO8CPzUAVrSSlLCNEuKsgnBnigcSMnxAZM2DQ']
 */