"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable("feedbacks", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            properties_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "properties", key: "id" },
            },
            host: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            note: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
            },
            text: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        queryInterface.dropTable("feedbacks");
    }
};

