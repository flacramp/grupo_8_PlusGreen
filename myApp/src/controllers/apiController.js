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
            let totalSum = products.map(oneProduct => total = oneProduct.list_price * oneProduct.stock);
            let data = {
                aggregations: {
                    totalProducts: products.length,
                    totalAmount: totalSum.reduce((a, b) => a + b, 0),
                    status: res.statusCode,
                    method: req.method,
                },
                results: products,
            }
            res.json(data);
        })
        .catch(error => console.log(error));

},
    getUsers: (req, res) => {
        db.Users
            .findAll(
               
            )
            .then(users => {

                let data = {
                    aggregations: {
                        totalUsers: users.length,
                        status: res.statusCode,
                        method: req.method,
                    },
                    results: users,
                }
                res.json(data);
            })
            .catch(error => console.log(error));

    },
    getCategories: (req, res) => {
        db.Categories
            .findAll(

            )
            .then(categories => {

                let data = {
                    aggregations: {
                        totalCategories: categories.length,
                        status: res.statusCode,
                        method: req.method,
                    },
                    results: categories,
                }
                res.json(data);
            })
            .catch(error => console.log(error));

    },
};

module.exports = controller;