const { Model, DataTypes } = require("sequelize");
class Feedback extends Model {
    static init(sequelize) {
        super.init({
            host: DataTypes.STRING,
            note: DataTypes.DECIMAL(10,2),
            text: DataTypes.STRING,
            date: DataTypes.DATEONLY,
            title: DataTypes.STRING,
        }, {
            sequelize
        });
    }
    static associate(models){
        this.belongsTo(models.Properties, {foreignKey: "properties_id", as:"properties"});
    }
}

module.exports = Feedback;