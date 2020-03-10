const fs = require('fs');
const bcryptjs = require('bcryptjs');
const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;

const controller = {
getProducts: (req, res) => {
    db.Products
        .findAll(
            {
                include: ['categories', 'colors', 'brands']
            }
        )
        .then(products => {

            res.json(products);
        })
        .catch(error => console.log(error));

},
};

module.exports = controller;