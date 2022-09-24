const jwt = require('jsonwebtoken');
var config = require('../config/env.config');

const singleToken = async () => { //Genera Token
    return jwt.sign(
        { //Payload ! Carga útil //Solo poner datos publicos ya que se pueden ver. 
          flagJWT: true 
        }, 
        config.token, //Token secreto 
    );
}

const tokenSign = async (user) => { //Genera Token
    return jwt.sign(
        {   //Payload ! Carga útil //Solo poner datos publicos ya que se pueden ver.
            flagJWT: true ,
            id_user: user.id_user, 
            role: user.role
        }, 
        config.token, //Token secreto 
        {
            expiresIn: "5h", //tiempo de vida
        } 
    );
}

const verifyToken = async (token) => { //verifica que el token resivido coincida con el token secreto
    try {
        return jwt.verify(token, config.token)
    } catch (e) {
        return e.message
    }
}

const decodeSign = (token) => { //Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = { singleToken, tokenSign, decodeSign, verifyToken }