module.exports = function (sequelize, dataTypes){
    
    let alias='Products';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        category: {
            type: dataTypes.STRING,
        },
        name: {
            type: dataTypes.STRING,
        },
        brand: {
            type: dataTypes.STRING,
        }, 
        model: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.BLOB,
        },
        color: {
            type: dataTypes.STRING,
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
        weigth: {
            type: dataTypes.INTEGER,
        },
        // user_id: {
        //     type: dataTypes.INTEGER
        // },

    };
    
    let config = {
        tableName = 'products',
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
        })
    };
    

    
    
    return Product;
}