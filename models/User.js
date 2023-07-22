const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
     }
});

sequelize.sync({ froce: true})
    .then(() => {
        console.log('Models synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing models:', error);
    });

    module.exports = User;