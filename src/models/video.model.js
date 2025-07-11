const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Video = sequelize.define('Video', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        iframe_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        player: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dubbing: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'videos',
        timestamps: true
    });

    return Video;
}
