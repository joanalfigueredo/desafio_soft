const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Feedback = require("../models/Feedback");
const Properties = require("../models/Properties");
const connection = new Sequelize(dbConfig);

Properties.init(connection);
Feedback.init(connection);
Properties.associate(connection.models),
Feedback.associate(connection.models),

module.exports = connection;