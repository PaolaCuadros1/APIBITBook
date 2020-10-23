module.exports = {
    mongoDB: process.env.MONGODB || 'mongodb+srv://userAdminBook:testBITBook@proyectobit.3pvug.mongodb.net/BITBook?retryWrites=true&w=majority',
    key: process.env.KEY || 'llaveSecretaBITBookEncriptarCont',
    iv: process.env.IV || 'vectorEncriptarP'
}