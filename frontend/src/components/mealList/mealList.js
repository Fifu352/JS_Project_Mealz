import React, {PureComponent} from 'react'
import axios from "axios";
import style from './style.css'
import {Link} from "react-router-dom";


class foodList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Meals: []
        };
    }

    getIngredients = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/meals',
            headers: {'Content-Type': 'application/json', 'code': 'XYZ'},
            data: {}

        }).then(res => {
            const data = res.data
            console.log(data)
            const meals = data.map(u =>
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.kcal}</td>
                    <td>{u.proteins}</td>
                    <td>{u.carbs}</td>
                    <td>{u.fats}</td>
                    <td>
                        <btn onClick={this.deleteHandler.bind(this, u.id)}>Delete</btn>
                    </td>
                    <td>
                        < Link to={`/addingredient/${u.id}`}>Add ingredient</Link>
                    </td>
                </tr>
            )

            this.setState({
                meals
            })

        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getIngredients()
    }

    deleteHandler(i, e) {
        e.preventDefault();

        axios({
            method: 'DELETE',
            url: 'http://localhost:4000/meals/' + i,
            headers: {'Content-Type': 'application/json', 'code': 'XYZ'},
            params: {}

        }).then(function (response) {
            window.location.reload();
            return "FOOD removed"
        })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    };
    modifyHandler(i, e) {
        e.preventDefault();


    }

    render() {


        return (
            <div>
                <h1 id='title'>Your Meals</h1>
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

                    {this.state.meals}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default foodList


