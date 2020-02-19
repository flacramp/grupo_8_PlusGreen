module.exports = function (sequelize, dataTypes){
    
    let alias='Users';
    
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        first_name: {
            type: dataTypes.STRING,
        },
        last_name: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING,
        }, 
        password: {
            type: dataTypes.STRING,
        },
        image: {
            type: dataTypes.BLOB,
        },
    };
    
    let config = {
        tableName: 'users',
        timestamp: true,
    }
    
    
    let User = sequelize.define(alias, cols, config);


    User.associate=function(models){
        User.hasMany(models.Products, {
            as: 'products',
            foreignKey: 'user_id',
        })
    };


    return User;
}