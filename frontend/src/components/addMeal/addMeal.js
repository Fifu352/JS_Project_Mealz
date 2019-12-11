import React, { PureComponent } from 'react'

import style from './style.css'
import axios from "axios";

function addMeal(name){
  axios({
    method: 'POST',
    url: 'http://localhost:4000/meals',
    headers: {'Content-Type': 'application/json' , 'code':'XYZ'},
    data:{
      name: name
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



export default addMeal
