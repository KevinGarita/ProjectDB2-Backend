const { verifyToken } = require('../helpers/generateToken')
const HttpStatus = require('http-status-codes');

const checkAuth = async (req, res, next) => {
    try {
        if(!req.headers.authorization){
            res.status(HttpStatus.StatusCodes.UNAUTHORIZED)
            res.json({ message: 'The token was not received in the header authorization!'})
        }else{
            //authorization: Bearer 1010101010101001010100 
            const token = req.headers.authorization.split(' ').pop() //123123213
            const tokenData = await verifyToken(token);
            if(tokenData.flagJWT) {
                next()
            }else if(tokenData == 'jwt expired'){
                res.status(HttpStatus.StatusCodes.UNAUTHORIZED)
                res.json({ message: 'The token has expired!'})
            }else{
                res.status(HttpStatus.StatusCodes.UNAUTHORIZED)
                res.json({ message: 'The token is invalid!'})
            }
        }

    } catch (e) {
        //console.log(e)
        res.status(HttpStatus.StatusCodes.CONFLICT)
        res.json({ message: 'Unexpected error, which is why the token cannot be verified'})
    }

}

module.exports = checkAuth