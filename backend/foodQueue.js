const Queue = require('bull');
const foodQueue = new Queue('import food');
const db = require('./models')
const axios = require('axios');
const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');

const cors = require('cors');



const app = express()
const port = 4000

const basicAuth = require('express-basic-auth')

foodQueue.process(function (job, done) {
    console.log(job.data.name)
    setTimeout(function () {
        axios({
            method: 'GET',
            url: 'https://api.edamam.com/api/food-database/parser',
            headers: {'Content-Type': 'multipart/form-data'},
            params: {
                'ingr': job.data.name,
                'app_id': '4b720b48',
                'app_key': 'd542fb69544b224d14c06dfb1ee6fdbb'
            }

        }).then(function (response) {

            const labela = response.data.parsed[0].food.label;
            const kcal = response.data.parsed[0].food.nutrients.ENERC_KCAL;
            const proteins = response.data.parsed[0].food.nutrients.PROCNT;
            const carbs = response.data.parsed[0].food.nutrients.CHOCDF;
            const fats = response.data.parsed[0].food.nutrients.FAT;

            db.Ingredient.create({name:labela, kcal:kcal, proteins:proteins, carbs:carbs,fats: fats})
                .then(console.log("The file was saved!"))
                .catch((err) => {
                    console.log('Oooops! Can not create an ingredient!', JSON.stringify(err))

                })
        })
            .catch(function (response) {
                //handle error
                console.log(response);
            });


    }, 3000)
    done()
})

module.exports = foodQueue;
