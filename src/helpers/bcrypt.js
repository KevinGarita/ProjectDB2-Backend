const bcrypt = require('bcryptjs') 

//Para encriptar
const encrypt = async (textPlain) => { 
    const hash = await bcrypt.hash(textPlain, 10) 
    return hash
}

//Para comparar 
const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword) //retorna un boolean
}

module.exports = { encrypt, compare }