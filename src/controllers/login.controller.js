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
        /*
        fs.readFile('src/database/scripts/generador_base_json.sql', 'utf8', async (error, datos) => {
            //console.log(datos)
            await dbConnection.query(datos);
        })
        */

        const stringjson = await dbConnection.query(
            `CREATE OR REPLACE FUNCTION public.createDatabaseJSON()
			RETURNS JSON
			LANGUAGE plpgsql
			AS
			$$
			DECLARE
				json_script VARCHAR;
				schemas_name REFCURSOR;
				schema_json REFCURSOR;
				remove_comma REFCURSOR;
				schema_info REFCURSOR;
				table_info REFCURSOR;
				schema_json_res JSON;
				name_schema VARCHAR;
		
				table_info_json VARCHAR;
				s_table_name VARCHAR;
				c_name VARCHAR;
				c_type VARCHAR;
				c_max_char VARCHAR;
				c_col_default VARCHAR;
				c_nullable VARCHAR;
				
				--INFORMACION PARA LAS LLAVES FORANEAS
				constraint_cursor REFCURSOR;
				t_schema VARCHAR;
				con_name VARCHAR;
				t_name VARCHAR;
				col_name VARCHAR;
				f_table_schema VARCHAR;
				f_table_name VARCHAR;
				f_col_name VARCHAR;
				const_type VARCHAR;
				
				BEGIN
					json_script = '{';
					OPEN schemas_name FOR
						SELECT schema_name FROM information_schema.schemata;
					FETCH schemas_name INTO name_schema;
					LOOP
						IF FOUND THEN
							
							IF (name_schema != 'pg_toast' AND name_schema  != 'pg_catalog' AND name_schema  != 'information_schema') THEN
								json_script = json_script || '"'||name_schema||'":';
								json_script = json_script || '{';
		
									OPEN schema_info FOR
										SELECT table_name FROM information_schema.tables WHERE table_schema = name_schema;
									FETCH schema_info INTO s_table_name;
		
									LOOP 
		
										IF FOUND THEN
		
											IF (s_table_name IS NOT NULL) THEN
											OPEN table_info FOR 
												SELECT column_name, data_type, character_maximum_length, column_default, is_nullable
												FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = s_table_name;
											FETCH table_info INTO c_name, c_type, c_max_char, c_col_default, c_nullable;
											
											OPEN constraint_cursor FOR
												SELECT
													tc.table_schema, 
													tc.constraint_name, 
													tc.table_name, 
													kcu.column_name, 
													ccu.table_schema AS foreign_table_schema,
													ccu.table_name AS foreign_table_name,
													ccu.column_name AS foreign_column_name,
													tc.constraint_type
												FROM 
													information_schema.table_constraints AS tc 
													JOIN information_schema.key_column_usage AS kcu
													  ON tc.constraint_name = kcu.constraint_name
													  AND tc.table_schema = kcu.table_schema
													JOIN information_schema.constraint_column_usage AS ccu
													  ON ccu.constraint_name = tc.constraint_name
													  AND ccu.table_schema = tc.table_schema
												WHERE  tc.table_name=s_table_name;
		
											FETCH constraint_cursor INTO t_schema, con_name, t_name,col_name,f_table_schema,f_table_name,f_col_name, const_type;
											
		
											json_script = json_script || '"' || s_table_name || '":{';	
											json_script = json_script || '"table_constraints":'|| '{';
											LOOP
											
												IF FOUND THEN
													json_script = json_script|| '"' || con_name || '":{';
													json_script = json_script || '"constraint_type":' || '"' || const_type || '",';
													json_script = json_script || '"table_schema":' || '"' || t_schema || '",';
													json_script = json_script || '"constraint_name":' || '"' || con_name || '",';
													json_script = json_script || '"table_name":' || '"' || t_name || '",';
													json_script = json_script || '"column_name":' || '"' || col_name || '",';
													json_script = json_script || '"foreign_table_schema":' || '"' || f_table_schema || '",';
													json_script = json_script || '"foreign_table_name":' || '"' || f_table_name || '",';
													json_script = json_script || '"foreign_column_name":' || '"' || f_col_name || '"';
													json_script = json_script || '},';
												ELSE
													EXIT;
												END IF;
												FETCH constraint_cursor INTO t_schema, con_name, t_name,col_name,f_table_schema,f_table_name,f_col_name, const_type; 
											END LOOP;
											IF (RIGHT(json_script, 1) = ',') THEN 
												OPEN remove_comma FOR
														SELECT substr(json_script, 1, length(json_script)-1);
												FETCH remove_comma INTO json_script;
												CLOSE remove_comma;
											END IF;
											json_script = json_script || '},';
											CLOSE constraint_cursor;
									
											LOOP
												IF FOUND THEN
		
													json_script = json_script || '"'|| c_name||'":{';
													json_script = json_script || '"data_type":"'|| c_type || '",';
													json_script = json_script || '"column_name":"'|| c_name || '"';
		
		
													json_script = json_script || '}';
												ELSE
													EXIT;
												END IF;
												json_script = json_script || ',';
												FETCH table_info INTO c_name, c_type, c_max_char, c_col_default, c_nullable;
											END LOOP;
											OPEN remove_comma FOR
												SELECT substr(json_script, 1, length(json_script)-1);
											FETCH remove_comma INTO json_script;
											CLOSE remove_comma;
											json_script = json_script || '}';
											CLOSE table_info;
											ELSE
												EXIT;
											END IF;
		
										ELSE
											EXIT;
										END IF;
										json_script = json_script || ',';
										FETCH schema_info INTO s_table_name;
									END LOOP;
									IF (RIGHT(json_script, 1) = ',') THEN 
										OPEN remove_comma FOR
												SELECT substr(json_script, 1, length(json_script)-1);
										FETCH remove_comma INTO json_script;
										CLOSE remove_comma;
									END IF;
									json_script = json_script || '}';
									CLOSE schema_info;
		
								json_script = json_script || ',';
							ELSE
								raise notice '%', 'No se encontró este nombre';
							END IF;
		
		
						ELSE
							EXIT;
						END IF;
						FETCH schemas_name INTO name_schema;
					END LOOP;
					CLOSE schemas_name;
					
					OPEN remove_comma FOR
						SELECT substr(json_script, 1, length(json_script)-1);
					FETCH remove_comma INTO json_script;
					
					json_script = json_script || '}';
					CLOSE remove_comma;
		
					RETURN to_json(json_script::text);
				END;
			$$;

SELECT public.createdatabasejson();`
        );
        
        return result = JSON.parse(stringjson[0][0].createdatabasejson);
        
    }else{
        return result
    }

});