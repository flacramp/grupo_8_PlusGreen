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
        Product.belongsTo(models.Users, {
            as: 'users',
            foreignKey: 'user_id',
        }),
        Product.belongsTo(models.Categories,{
            as: 'categories',
            foreignKey: 'category_id'
        }),
        Product.belongsTo(models.Colors,{
            as: 'colors',
            foreignKey: 'color_id'
        }),
        Product.belongsTo(models.Brands,{
            as: 'brand',
            foreignKey: 'brand_id'
        })
    };
    

    
    
    return Product;
}