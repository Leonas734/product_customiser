const db = require("./db")

const Product = db.products;
const Extra = db.extras;
const Option = db.options;

exports.CreateProduct = (title, base_objects, price) => {
    
    return db.products.create({ title, base_objects, price }).then((product) => {
        console.log("Successfully created product" + JSON.stringify(product))
        return product
    }).catch((err) => {
        console.log("Error while creating product: ", err)
    })
}

exports.CreateExtra = (title, productId) => {
    return db.extras.create({ title, productId }).then((extra) => {
        console.log("Successfully created product extra" + JSON.stringify(extra))
        return extra
    }).catch((err) => {
        console.log("Error while creating product extra: ", err)
    })
}

exports.CreateOption = (title, objects_to_show, price, extraId) => {
    return db.options.create({ title, objects_to_show, price, extraId }).then((option) => {
        console.log("Successfully created product option" + JSON.stringify(option))
        return option
    }).catch((err) => {
        console.log("Error while creating product option: ", err)
    })
}