import React, {Component} from 'react';
import style from './style.css'
import axios from "axios";
import {auth} from "../../context/auth";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import food from "../food/food";
import foodList from "../foodList";
import meal from "../meal/meal";
import mealList from "../mealList/mealList";
import addIngredientToTheMeals from "../addIngredientToTheMeals";
import myMeal from "../myMeal/myMeal";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: '',
            credit: 'blue'
        };


        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    dismissError() {
        this.setState({error: ''});
    }

    handleSubmit(evt) {

        evt.preventDefault();
        console.log(this.state.username, this.state.password)
        const encodedString = new Buffer(this.state.username + ':' + this.state.password).toString('base64')
        console.log(encodedString)

        axios({
            method: 'GET',
            url: 'http://localhost:4000/authenticate',
            headers: {'Content-Type': 'application/json', 'code': 'XYZ', 'Authorization':"Basic "+encodedString},


        }).then(result => {
            if (result.status === 200) {
                console.log("aaaaaa")
                this.setState({
                    credit: "green"
                })

            }
        }).catch(function (response) {
            //handle error
            console.log(response);
        });
    }




    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        // NOTE: I use data-attributes for easier E2E testing
        // but you don't need to target those (any css-selector will work)
        if(this.state.credit!=="green"){this.body=
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    {
                        this.state.error &&
                        <h3 data-test="error" onClick={this.dismissError}>
                            <button onClick={this.dismissError}>✖</button>
                            {this.state.error}
                        </h3>
                    }
                    <label>User Name</label>
                    <input type="text" data-test="username" value={this.state.username}
                           onChange={this.handleUserChange}/>

                    <label>Password</label>
                    <input type="password" data-test="password" value={this.state.password}
                           onChange={this.handlePassChange}/>

                    {this.state.credit}



                    <input type="submit" value="Log In" data-test="submit"/>
                </form>

            </div>
        }else{
            this.body =
                <Router>
                    <div>
                        <nav>
                            <ul>

                                <li>
                                    <Link to="/food">Add ingredients</Link>
                                </li>
                                <li>
                                    <Link to="/meal">Add meals</Link>
                                </li>


                            </ul>
                        </nav>




                        <Switch>

                            <Route exact path="/food" component={food}/>


                        </Switch>
                        <Switch>

                            <Route exact path="/food" component={foodList}/>


                        </Switch>
                        <Switch>

                            <Route exact path="/meal" component={meal}/>


                        </Switch>
                        <Switch>

                            <Route exact path="/meal" component={mealList}/>


                        </Switch>
                        <Switch>

                            <Route exact path="/addingredient/:id" component={addIngredientToTheMeals}/>


                        </Switch>

                        <Switch>

                            <Route exact path="/addingredient/:id" component={myMeal}/>


                        </Switch>
                        <Switch>

                            <Route exact path="/addingredient/:id" component={foodList}/>


                        </Switch>
                    </div>

                </Router>

        }
        return (
            <auth.Provider value={this.state.credit}>

                {this.body}

            </auth.Provider>
        );
    }
}

export default Login;