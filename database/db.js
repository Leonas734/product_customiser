require('dotenv').config()
const Sequelize = require('sequelize')

const {
    DB_TYPE,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME, 
    DB_PORT } = process.env


// https://sequelize.org/docs/v6/getting-started/
const sequelize = new Sequelize(
    `${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`)


// Test connection
sequelize.authenticate().then(resp => {
    console.log(">> Connection with database established")
}, err => {
    console.log(">> Could NOT establish connection with DB: ", err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require("./models/product.js")(sequelize, Sequelize);
db.extras = require("./models/extra.js")(sequelize, Sequelize);
db.options = require("./models/option.js")(sequelize, Sequelize);

db.products.hasMany(db.extras, { as: "extras" });
db.extras.belongsTo(db.products, {
    foreignKey: "productId",
    as: "product"
});

db.extras.hasMany(db.options, { as: "options"});
db.options.belongsTo(db.extras, {
    foreignKey: "extraId",
    as: "extra"
});

module.exports = db