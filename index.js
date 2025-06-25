require('dotenv').config();

const { port } = require('./src/lib/config');
const { sequelize, testConnection } = require('./src/lib/db');
const app = require('./src/app');

const startApplication = async () => {
    try {
        await testConnection();

        await sequelize.sync({ force: false });

        app.listen(port, () => {
            console.log(`server listening on http://localhost:${port} !`);
        });
    } catch (error) {
        console.log('Произошла непредвиденная ошибка');
        console.error(error);
        process.exit(1);   
    }
}

startApplication();
