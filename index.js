require('dotenv').config();

const { port } = require('./src/lib/config');
const { sequelize, testConnection } = require('./src/lib/db');
const app = require('./src/app');
const path = require('path');
const fs = require('fs-extra');

const startApplication = async () => {
    try {

        const avatarsDirExists = await fs.exists(path.join(__dirname, 'src', 'view', 'avatars'));
        if (!avatarsDirExists) {
            await fs.mkdir(path.join(__dirname, 'src', 'view', 'avatars'));
        }

        const coversDirExists = await fs.exists(path.join(__dirname, 'src', 'view', 'covers'));
        if (!coversDirExists) {
            await fs.mkdir(path.join(__dirname, 'src', 'view', 'covers'));
        }

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
