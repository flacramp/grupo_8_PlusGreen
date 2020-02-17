module.exports = function (sequelize, dataTypes){
    
    let alias='Categories';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: dataTypes.STRING,
        },
    };
    
    let config = {
        tableName: 'categories',
        timestamp: true,
    }
    
    
    let Category = sequelize.define(alias, cols, config);


    Category.associate=function(models){
        Category.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'category_id',
        })
    };


    return Category;
}