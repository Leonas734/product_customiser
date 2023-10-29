//user model
module.exports = (sequelize, DataTypes) => {
    const Extra = sequelize.define( "extra", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {timestamps: true}, )
    return Extra
 }