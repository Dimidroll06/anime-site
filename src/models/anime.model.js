const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Anime = sequelize.define('Anime', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            default: 'ongoing'
        },
        coverUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        videoUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        }
    }, {
        tableName: 'animes',
        timestamps: true
    });

    return Anime;
}
