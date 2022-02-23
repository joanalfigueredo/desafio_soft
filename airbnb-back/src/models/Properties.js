const { Model, DataTypes } = require("sequelize");
class Properties extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            type: DataTypes.STRING,
            adress: DataTypes.STRING,
            district: DataTypes.STRING,
            guests: DataTypes.STRING,
            description: DataTypes.STRING,
            available: DataTypes.STRING,
            shared: DataTypes.STRING,
        }, {
            sequelize
        });
    }
    static associate(models){
        this.hasMany(models.Feedback, {foreignKey: "properties_id", as:"feedbacks"});
    }
}

module.exports = Properties;