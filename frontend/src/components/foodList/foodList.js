import React, { PureComponent } from 'react'
import axios from "axios";
import style from './style.css'






class foodList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            Ingredients: []
        };
    }
    componentDidMount() {

        this.interval = setInterval(() => this.getIngredients(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    getIngredients = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:4000/ingredients',
            headers: {'Content-Type': 'application/json', 'code': 'XYZ'},
            data: {}

        }).then(res => {
            const data = res.data
            console.log(data)
            const ingredients = data.map(u =>
                <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.kcal}</td>
                    <td>{u.proteins}</td>
                    <td>{u.carbs}</td>
                    <td>{u.fats}</td>
                    <td><btn onClick={this.deleteHandler.bind(this, u.id)} >Delete</btn></td>
                </tr>


            )

            this.setState({
                ingredients
            })

        }).catch((error) => {
            console.log(error)
        })
    }


    deleteHandler(i, e) {
        e.preventDefault();

        axios({
            method: 'DELETE',
            url: 'http://localhost:4000/ingredients/' + i,
            headers: {'Content-Type': 'application/json' , 'code':'XYZ'},
            params:{

            }

        })  .then(function (response) {
            window.location.reload();
            return "FOOD removed"
        })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    };


    render() {



        return (
            <div>
                <h1 id='title'>Your Ingredients</h1>
                <table id='ingredients'>
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

                    {this.state.ingredients}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default foodList


