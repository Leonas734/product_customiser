//user model
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define( "product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        base_objects: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        }
    }, {timestamps: true}, )
    return Product
}