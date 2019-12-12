'use strict';
module.exports = (sequelize, DataTypes) => {
    const FoodIngredient = sequelize.define('FoodIngredient', {
        mealId: DataTypes.INTEGER,
        ingredientId: DataTypes.INTEGER,
        weight: DataTypes.FLOAT(2)
    }, {});
    FoodIngredient.associate = function(models) {


    };
    return FoodIngredient;
};
