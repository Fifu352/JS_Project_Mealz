import React, { PureComponent } from 'react'

import style from './style.css'
import getFood from "../getFood";
import axios from "axios";

function addIngredientToMeal(values){
  axios({
    method: 'PUT',
    url: 'http://localhost:4000/meals/addingredient/'+values.id,
    headers: {'Content-Type': 'application/json' , 'code':'XYZ'},
    data:{
      ingredientId: values.ingredientId,
      weight: values.weight
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

class addIngredientToTheMeals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {ingredientId: null,weight: null, id: null};

    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ingredientId: event.target.value});
  }
  handleWeightChange(event) {
    this.setState({weight: event.target.value});
  }
  componentDidMount () {
    this.state.id = this.props.match.params.id;
  }

  handleSubmit(event) {


    addIngredientToMeal(this.state)
    event.preventDefault();

  }


  render() {
    return (

        <form onSubmit={this.handleSubmit}>
          <label>
            Ingredient id:
            <input type="text" value={this.state.ingredientId} onChange={this.handleNameChange} />
          </label>
          <label>
            Ingredient weight:
            <input type="number" value={this.state.weight} onChange={this.handleWeightChange} />
          </label>
          <input  type="submit" value="Submit" />


        </form>



    );
  }
}

export default addIngredientToTheMeals
