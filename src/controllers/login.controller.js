const { Sequelize, DataTypes } = require('sequelize');
const controllerHelper = require('../helpers/controllerHelper');
var config = require('../../src/config/env.config');
const fs = require('fs');

exports.login = controllerHelper(async (req, res) => {
    const data = req.body;

    const databaseURL = "postgres://" + data.username + ":" + data.password + "@" + data.host + ":" + data.port + "/" + data.database; //CursoBD2:12345@localhost:5432/pruebas"

    const dbConnection = new Sequelize(databaseURL,
        {
        pool: config.database.pool,
        define: config.database.define,
        dialectOptions: config.database.dialectOptions
        }
    );

    try{
        await dbConnection.authenticate(); //Authenticate the connection to the database
        console.log('Connection has been established successfully.');
        result = true;

    }catch (error) {
        console.error('Unable to connect to the database:', error);
        result = false;
    }

    if(result == true){
        fs.readFile('src/database/scripts/generador_base_json.sql', 'utf8', async (error, datos) => {
            //console.log(datos)
            await dbConnection.query(datos);
        })

        const stringjson = await dbConnection.query('SELECT public.createDatabaseJSON()');
        //console.log(JSON.parse(stringjson[0][0].createdatabasejson));
        return result = JSON.parse(stringjson[0][0].createdatabasejson);
        
    }else{
        return result
    }

});