module.exports = (sequelize, DataTypes) => {
    

    const School = sequelize.define("school", {
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        address:{
            type:DataTypes.TEXT
           

        },
        latitude:{
            
            type:DataTypes.FLOAT,
        },
        longitude:{
            type:DataTypes.FLOAT,
        }
    })

    return School
}