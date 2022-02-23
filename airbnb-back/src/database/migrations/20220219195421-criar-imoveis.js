"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable("properties", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            type: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            adress: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            district: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            guests: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            available: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            shared: {
                type: Sequelize.STRING(10),
                allowNull: false,
            }
        });
    },

    async down(queryInterface) {
        queryInterface.dropTable("properties");
    }
};

