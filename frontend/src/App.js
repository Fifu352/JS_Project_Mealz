import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

import food from './components/food/food.js'
import foodList from './components/foodList/foodList.js'
import {auth} from "./context/auth";
import meal from './components/meal/meal.js'
import mealList from './components/mealList/mealList.js'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import addIngredientToTheMeals from "./components/addIngredientToTheMeals";
import myMeal from "./components/myMeal/myMeal";
import login from "./components/login/login";
import Login from "./components/login/login";
//const FD = new FormData(form);


function App() {


    return (

        <Login>

        </Login>


    );
}

export default App;
