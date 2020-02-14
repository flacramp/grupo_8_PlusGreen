module.exports = function (sequelize, dataTypes){
    
    let alias='Products';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category_id: {
            type: dataTypes.INTEGER,
        },
        name: {
            type: dataTypes.STRING,
        },
        brand_id: {
            type: dataTypes.INTEGER,
        }, 
        model: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.BLOB,
        },
        color_id: {
            type: dataTypes.INTEGER,
        },
        description: {
            type: dataTypes.STRING,
        },
        list_price: {
            type: dataTypes.DOUBLE,
        },
        sale_price: {
            type: dataTypes.DOUBLE,
        },
        stock: {
            type: dataTypes.INTEGER,
        },
        width: {
            type: dataTypes.INTEGER,
        },
        length: {
            type: dataTypes.INTEGER,
        },
        height: {
            type: dataTypes.INTEGER,
        },
        weight: {
            type: dataTypes.INTEGER,
        },
        user_id: {
            type: dataTypes.INTEGER
        },

    };
    
    let config = {
        tableName: 'products',
        timestamp: true,
    }
    
    
    let Product = sequelize.define(alias, cols, config);
    
    Product.associate=function(models){
        Products.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id',
        }),
        Products.belongsTo(models.Category,{
            as: 'categories',
            foreignKey: 'category_id'
        }),
        Products.belongsTo(models.Color,{
            as: 'colors',
            foreignKey: 'color_id'
        }),
        Products.belongsTo(models.Brand,{
            as: 'brand',
            foreignKey: 'brand_id'
        })
    };
    

    
    
    return Product;
}