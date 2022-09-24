const app = require('./app');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerSpec = require('./helpers/swagger');

//Routes
const { login} = require('./routes/index');

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


