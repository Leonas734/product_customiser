//user model
module.exports = (sequelize, DataTypes) => {
    const Option = sequelize.define( "option", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        objects_to_show: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
    }, {timestamps: true}, )
    return Option
}