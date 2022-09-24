var express = require('express');
var router = express.Router();
const loginController = require('../controllers/login.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

/**
 * @swagger
 * /login:
 *  post:
 *   summary: access to the database
 *   tags: [Auth]
 *   requestBody: 
 *    required: true
 *    content: 
 *     application/json:
 *      schema: 
 *        type: object
 *      example:
 *        host: localhost
 *        port: 5432
 *        database: pruebas
 *        username: CursoBD2
 *        password: 12345
 *   responses:
 *      200:
 *        description: database structure
 *      400: 
 *        $ref: '#/components/responses/Bad_Request'
 *      401: 
 *        $ref: '#/components/responses/Unauthorized'
 *      403: 
 *        $ref: '#/components/responses/Forbidden'
 *      404: 
 *        $ref: '#/components/responses/Not_Found'
 *      409: 
 *        $ref: '#/components/responses/Conflict'
 *      423: 
 *        $ref: '#/components/responses/Locked'
 *      5XX: 
 *        $ref: '#/components/responses/Unexpected'
 */
router.post('/login', routerHelper(loginController.login, async (req, res, result) => {
    if(result == false){
        res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({message: 'Unable to connect to the database'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));

module.exports = router;