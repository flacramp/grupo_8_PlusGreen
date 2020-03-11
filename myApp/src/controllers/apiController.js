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

            let data = {
                aggregations: {
                    totalProducts: products.length,
                },
                results: products,
            }
            res.json(data);
        })
        .catch(error => console.log(error));

},
};

module.exports = controller;