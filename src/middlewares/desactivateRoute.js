const HttpStatus = require('http-status-codes');

const desactivate = (flag) => async (req, res, next) => {
    try {
        if(flag == true){
            res.status(HttpStatus.StatusCodes.LOCKED).json({ message: 'This route is deactivated!'});
        }else{
            next();
        }
    } catch (e) {
        res.status(HttpStatus.StatusCodes.CONFLICT);
        res.json({ message: 'Unexpected error, it was not possible to verify if the route is activated or deactivated'});
    }

}

module.exports = desactivate;