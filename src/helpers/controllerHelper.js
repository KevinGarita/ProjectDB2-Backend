var HttpStatus = require('http-status-codes');

function controllerHelper(callback) {
    return async (req, res) => {
        //ejecucción de las operaciones(query) en la base de datos
        try {
            return await callback(req, res);
        } catch (err) {
            throw err;
        }
    };
}

module.exports = controllerHelper;