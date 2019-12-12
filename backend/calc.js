const express = require('express')


function calc(mealValue, ingredientValue, weight){
    return mealValue  + weight * ingredientValue/100
}

module.exports = calc;