const {dbConnection, DataTypes} = require('../database/connection/dbConnection');

const user = dbConnection.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // OR defaultValue: fn('uuid_generate_v4') para migraciones.
        // 'uuid_generate_v4' is only available in postgres + uuid-ossp(Extension)
        // other dialects may support this function under different names.
        primaryKey: true,
        allowNull: false,
        /*
        validate: {
            isNumeric: true,
            isInt: true,
            min: 1
        }
        */
    },
    username: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(254),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(60), //bcryptjs
        allowNull: false
    },
    /*
        validate: {
            len: [8, 32]
        }
    */
    role: {
        type: DataTypes.STRING(20),
        defaultValue: "user",
        allowNull: false
    }
});

module.exports = user;