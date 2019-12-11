import React, { PureComponent } from 'react'

import style from './style.css'
import getFood from "../getFood";


class Food extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state.value)
    getFood(this.state.value);

    event.preventDefault();

  }


  render() {
    return (

        <form onSubmit={this.handleSubmit}>
          <label>
            Ingredient name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input  type="submit" value="Submit" />
        </form>



    );
  }
}

export default Food
