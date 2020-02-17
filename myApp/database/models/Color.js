module.exports = function (sequelize, dataTypes){
    
    let alias='Colors';
    
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
        tableName: 'colors',
        timestamp: true,
    }
    
    
    let Color = sequelize.define(alias, cols, config);


    Color.associate=function(models){
        Color.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'color_id',
        })
    };


    return Color;
}