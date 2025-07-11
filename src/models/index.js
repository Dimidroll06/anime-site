const { sequelize } = require('../lib/db');
const User = require('./user.model')(sequelize);
const Anime = require('./anime.model')(sequelize);
const Video = require('./video.model')(sequelize);

Anime.hasMany(Video, {
    foreignKey: 'animeId',
    as: 'videos'
});
Video.belongsTo(Anime, {
    foreignKey: 'animeId',
    as: 'anime'
});

module.exports = {
    sequelize,
    User,
    Anime,
    Video
}