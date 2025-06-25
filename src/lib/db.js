const Sequelize = require('sequelize');

let sequelize;

if (process.env.USE_DB === 'postgres') {
    sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || './database.sqlite',
    });
}

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Успешное подключение к БД');
    } catch (error) {
        console.error('Ошибка при подключении к БД');
        console.error(error);
        process.exit(1);
    }
}

module.exports = { sequelize, testConnection };