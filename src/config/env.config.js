require('dotenv').config();

var config = {
    database: {
        URL: process.env.DATABASE_URL,
        pool: {
            //Número máximo de conexiones en el grupo.
            max: 10,
            //Número mínimo de conexiones en el grupo.
            min: 0,
            //El tiempo máximo, en milisegundos, que una conexión puede estar inactiva en el grupo antes de que se cierre automáticamente.
            idle: 10000, //10 segundos
            //El tiempo máximo, en milisegundos, que el grupo intentará obtener una repuesta de la base de datos antes de generar un error.
            acquire: 60000 //60 segundos
        },
        define: {
            //Desactiva la generacion automatica de las columnas createdAt and updatedAt
            timestamps: false,
            //Genera claves foreneas de tipo user_id en vez de userId.
            undescored: true,
            //Sequelize will infer the table name to be equal to the model name, without any modifications
            freezeTableName: true,
        },
        dialectOptions: {
            ssl: process.env.DEVELOP? false : {
                require: true,
                rejectUnauthorized: false
              }
        }
    },
    server: {
        URL: process.env.APP_URL,
        HOST: process.env.APP_HOST,
        PORT: process.env.APP_PORT
    },
    token: process.env.JWT_SECRET
}
module.exports = config;