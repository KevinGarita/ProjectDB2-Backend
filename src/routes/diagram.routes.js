var express = require('express');
var router = express.Router();
const diagramController = require('../controllers/diagram.controller');
const HttpStatus = require('http-status-codes');
const routerHelper = require('../helpers/routerHelper');

//Middlewares
const {desactivateRoute} = require('../middlewares/index');

/**
 * @swagger
 * /diagram:
 *  get:
 *   summary: get all diagrams
 *   tags: [Diagram]
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
 *        description: The request succeeded.
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
router.get('/diagram', desactivateRoute(false), 
routerHelper(diagramController.getObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The diagram was not found'});
    }else{
        res.status(HttpStatus.StatusCodes.OK).json(result);
    }
}));


/**
 * @swagger
 * /diagram:
 *  post:
 *   summary: save a diagram
 *   tags: [Diagram]
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
 *        diagramURL: http://www.plantuml.com/plantuml/img/SoWkIImgAStDuKhEIImkLaZDBSX9JKp9LwZcqivCYOTnhHGoyqfIqrEBk6gv75BpKe0Q0000  
 *   responses: 
 *      201:
 *        $ref: '#/components/responses/Created'
 *      400: 
 *        $ref: '#/components/responses/Bad_Request'
 *      401: 
 *        $ref: '#/components/responses/Unauthorized'
 *      403: 
 *        $ref: '#/components/responses/Forbidden'
 *      409: 
 *        $ref: '#/components/responses/Conflict'
 *      423: 
 *        $ref: '#/components/responses/Locked'
 *      5XX: 
 *        $ref: '#/components/responses/Unexpected'
 */
router.post('/diagram', desactivateRoute(false),
routerHelper(diagramController.addObject, async (req, res, result) => {
    res.sendStatus(HttpStatus.StatusCodes.CREATED);
}));


/**
 * @swagger
 * /diagram:
 *  delete:
 *   summary: delete one diagram
 *   tags: [Diagram]
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
 *        diagramID: 1
 *   responses: 
 *      204:
 *        $ref: '#/components/responses/No_Content'
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
router.delete('/diagram', desactivateRoute(false), 
routerHelper(diagramController.deleteObject, async (req, res, result) => {
    if(!result){
        res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'The object to delete was not found'});
    }else{
        res.sendStatus(HttpStatus.StatusCodes.NO_CONTENT);
    }
}));


module.exports = router;