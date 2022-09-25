var HttpStatus = require('http-status-codes');

function routerHelper(controllerFunction, callback) {
    return async (req, res) => {
        controllerFunction(req)
            .then(async result => {
                try{
                    //console.log("Entro al then del routerHelper correctamente")
                    await callback(req, res, result);
                }catch(err){
                    res.status(HttpStatus.StatusCodes.CONFLICT).json({
                        message: "Unexpected error in the routes: "+ err.message,
                    }); 
                }
            })
            .catch(err => {
                console.log(err)
                if(err.errors && err.errors[0]){
                    res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({
                        message: err.message,
                    });
                }else{
                    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                        message: "Controller error, database connection or database operation failed!",
                        error: err.message
                    });
                }
            })
    };
}

module.exports = routerHelper;