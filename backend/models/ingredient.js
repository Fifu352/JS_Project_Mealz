'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: DataTypes.STRING,
    kcal: DataTypes.FLOAT(2),
    proteins: DataTypes.FLOAT(2),
    carbs: DataTypes.FLOAT(2),
    fats: DataTypes.FLOAT(2)
  }, {});
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Meal, { through: models.FoodIngredient });
  };
  return Ingredient;
};