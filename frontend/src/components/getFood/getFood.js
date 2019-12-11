import React, { PureComponent } from 'react'

import style from './style.css'
import axios from "axios";



function getFood(foodName){
  axios({
    method: 'GET',
    url: 'https://api.edamam.com/api/food-database/parser',
    headers: {'Content-Type': 'multipart/form-data' },
    params: {
      'ingr': foodName,
      'app_id': '4b720b48',
      'app_key': 'd542fb69544b224d14c06dfb1ee6fdbb'
    }

  })  .then(function (response) {



    //handle success
    console.log(response.data.parsed[0].food.nutrients.ENERC_KCAL);
    addFood(response);
    console.log("food added")
    return "FOOD RETRIVED"
  })
      .catch(function (response) {
        //handle error
        console.log(response);
      });


}
function addFood(response){
  axios({
    method: 'POST',
    url: 'http://localhost:4000/ingredients',
    headers: {'Content-Type': 'application/json' , 'code':'XYZ'},
    data:{
      name: response.data.parsed[0].food.label,
      kcal: response.data.parsed[0].food.nutrients.ENERC_KCAL,
      proteins: response.data.parsed[0].food.nutrients.PROCNT,
      carbs: response.data.parsed[0].food.nutrients.CHOCDF,
      fats:response.data.parsed[0].food.nutrients.FAT,
    }

  })  .then(function (response) {
    window.location.reload();
    return "FOOD ADDED"
  })
      .catch(function (response) {
        //handle error
        console.log(response);
      });


}



export default getFood
