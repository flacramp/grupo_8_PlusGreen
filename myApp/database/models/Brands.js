module.exports = function (sequelize, dataTypes){
    
    let alias='Brands';
    
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
        tableName: 'brands',
        timestamp: true,
    }
    
    
    let Brand = sequelize.define(alias, cols, config);


    Brand.associate=function(models){
        Brand.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'brand_id',
        })
    };


    return Brand;
}