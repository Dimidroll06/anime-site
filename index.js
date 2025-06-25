require('dotenv').config();

const { port } = require('./src/lib/config');
const app = require('./src/app');

const startApplication = async () => {
    app.listen(port, () => {
        console.log(`server listening on http://localhost:${port} !`);
    });
}

startApplication();
