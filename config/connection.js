const Sequalize = require('sequalize');
require('dotenv').config();


sequalize = new Sequalize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
);

module.exports = sequelize;