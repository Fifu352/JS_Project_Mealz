'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    kcal: DataTypes.FLOAT(2),
    proteins: DataTypes.FLOAT(2),
    carbs: DataTypes.FLOAT(2),
    fats: DataTypes.FLOAT(2)
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Ingredient, { through: models.FoodIngredient });
  };
  return Meal;
};