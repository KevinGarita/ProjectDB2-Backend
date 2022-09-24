const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
var config = require('../../config/env.config');



/*
const dbConnection = new Sequelize(
    config.database.database, 
    config.database.username, 
    config.database.password,
    {
    host: config.database.host,
    dialect: config.database.dialect, // one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' 
    port: config.database.port,
    pool: config.database.pool,
    define: config.database.define,
    dialectOptions: config.database.dialectOptions
    }
);
*/

async function main() {
    try {
        await dbConnection.authenticate(); //Authenticate the connection to the database
        console.log('Connection has been established successfully.');
        
        fs.readFile('src/database/scripts/generador_base_json.sql', 'utf8', async (error, datos) => {
            //console.log(datos)
            await dbConnection.query(datos);
        })
        

        const stringjson = await dbConnection.query('SELECT public.createDatabaseJSON()');
        console.log(JSON.parse(stringjson[0][0].createdatabasejson));
        //Required extensions in the database:
        //await dbConnection.query("CREATE EXTENSION IF NOT EXISTS postgis;"); //only for postgres
        //await dbConnection.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'); //only for postgres and only if we want to use fn('uuid_generate_v4') para migraciones.
        
        //Create, drop or alter tables in the data base:
        //await dbConnection.sync({ alter: true }); // or {force: true} to drop and recreate the tables
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

//main()

//module.exports = {dbConnection, DataTypes};