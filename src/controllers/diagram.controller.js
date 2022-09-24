const { Sequelize, DataTypes } = require('sequelize');
const controllerHelper = require('../helpers/controllerHelper');
var config = require('../config/env.config');


exports.getObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const databaseURL = "postgres://" + data.username + ":" + data.password + "@" + data.host + ":" + data.port + "/" + data.database; //CursoBD2:12345@localhost:5432/pruebas"

    const dbConnection = new Sequelize(databaseURL,
        {
        pool: config.database.pool,
        define: config.database.define,
        dialectOptions: config.database.dialectOptions
        }
    );

    const result = await dbConnection.query("SELECT * FROM public.diagrams_url");

    return result[0];
});

exports.addObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const databaseURL = "postgres://" + data.username + ":" + data.password + "@" + data.host + ":" + data.port + "/" + data.database; //CursoBD2:12345@localhost:5432/pruebas"

    const dbConnection = new Sequelize(databaseURL,
        {
        pool: config.database.pool,
        define: config.database.define,
        dialectOptions: config.database.dialectOptions
        }
    );

    const result = await dbConnection.query(
        `CREATE OR REPLACE FUNCTION public.saveDiagram(diagramURL VARCHAR)
	RETURNS BOOL
	LANGUAGE plpgsql
  AS
$$
DECLARE

BEGIN
	IF(to_regclass('public.diagrams_url') IS NOT NULL) THEN 
		INSERT INTO public.diagrams_url VALUES (diagramURL);
		RETURN 1;	
	END IF;

	
	CREATE TABLE public.diagrams_url (
		url VARCHAR NOT NULL,
		id SERIAL NOT NULL
	);
	INSERT INTO public.diagrams_url VALUES (diagramURL);
	RETURN 1;
END;
$$;
SELECT public.saveDiagram( '${data.diagramURL}' )`
    );

    return result;
});


exports.deleteObject = controllerHelper(async (req, res) => {
    const data = req.body;

    const databaseURL = "postgres://" + data.username + ":" + data.password + "@" + data.host + ":" + data.port + "/" + data.database; //CursoBD2:12345@localhost:5432/pruebas"

    const dbConnection = new Sequelize(databaseURL,
        {
        pool: config.database.pool,
        define: config.database.define,
        dialectOptions: config.database.dialectOptions
        }
    );

    const result = await dbConnection.query(`DELETE FROM public.diagrams_url WHERE id= ${data.diagramID}`);

    return result;
});
