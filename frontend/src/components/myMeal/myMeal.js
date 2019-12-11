import React, {PureComponent} from 'react'
import axios from "axios";
import style from './style.css'
import {Link} from "react-router-dom";


class foodList extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      Meal: null, id:null
    };
  }

  getIngredients = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:4000/meals/'+this.state.id,
      headers: {'Content-Type': 'application/json', 'code': 'XYZ'},
      data: {}

    }).then(res => {
      const data = res.data
      console.log(data)
      const meal = (
          <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.kcal}</td>
            <td>{data.proteins}</td>
            <td>{data.carbs}</td>
            <td>{data.fats}</td>
          </tr>
      )

      this.setState({
        meal
      })

    }).catch((error) => {
      console.log(error)
    })
  }

  componentDidMount() {
    this.state.id = this.props.match.params.id;
    this.getIngredients()
  }



  render() {


    return (
        <div>
          <h1 id='title'>My meal</h1>
          <table id='meals'>
            <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>kcal</th>
              <th>proteins</th>
              <th>carbs</th>
              <th>fats</th>
            </tr>
            </thead>
            <tbody>

            {this.state.meal}
            </tbody>
          </table>
        </div>
    )
  }
}

export default foodList


