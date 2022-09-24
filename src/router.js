const app = require('./app');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('./helpers/swagger');

//Routes
const { login, diagram } = require('./routes/index');

//Route to documentation
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

/**
 * @swagger
 * components:
 *  examples:
 *   login:
 *    host: localhost
 *    port: 5432
 *    database: pruebas
 *    username: CursoBD2
 *    password: 12345    
 */
app.use(login); //login route


/**
 * @swagger
 * components:
 *  examples:
 *   connectDB:
 *    host: localhost
 *    port: 5432
 *    database: pruebas
 *    username: CursoBD2
 *    password: 12345    
 */
/**
 * @swagger
 * components:
 *  examples:
 *   postDiagram:
 *    host: localhost
 *    port: 5432
 *    database: pruebas
 *    username: CursoBD2
 *    password: 12345  
 *    diagramURL: http://www.plantuml.com/plantuml/img/SoWkIImgAStDuKhEIImkLaZDBSX9JKp9LwZcqivCYOTnhHGoyqfIqrEBk6gv75BpKe0Q0000  
 */
/**
 * @swagger
 * components:
 *  examples:
 *   deleteDiagram:
 *    host: localhost
 *    port: 5432
 *    database: pruebas
 *    username: CursoBD2
 *    password: 12345  
 *    diagramID: 1
 */
 app.use(diagram); //diagram routes
