const { sequelize } = require('../lib/db');
const User = require('./user.model')(sequelize);
const Anime = require('./anime.model')(sequelize);

module.exports = {
    sequelize,
    User,
    Anime
}