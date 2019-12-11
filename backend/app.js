const express = require('express')
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');

const cors = require('cors');

const app = express()
const port = 4000
const db = require('./models')
const basicAuth = require('express-basic-auth')

// SERVER


var server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(bodyParser.json());
app.use(cors({
        origin: 'http://localhost:3000'
    }
))
app.use( function(req, res, next) {
  if (req.headers.code !== 'XYZ') {
    return res.status(403).json({ error: 'Invalid or missing credentials!' });
  }
  next();
});


const jsonParser = bodyParser.json()


const auth = basicAuth({
    users: {
        'admin': 'admin',
        user: '456',
    },
});

app.get('/authenticate', auth, jsonParser, (req, res) => {
    const { user, password} = req.auth

    if(user === 'admin' && password==='admin'){
        return res.status(200).send(req.auth)
    }else{
        return res.status(401).send()
    }

})


app.get('/ingredients',function (req, res) {return db.Ingredient.findAll()
    .then((ingredients) => res.send(ingredients))
    .catch((err) => {
      console.log('Oooops! No ingredeints!', JSON.stringify(err))
      return res.send(err)
    })
})

app.get('/meals', function (req, res) {
    return db.Meal.findAll()
        .then((meals) => res.send(meals))
        .catch((err) => {
            console.log('Oooops! No meals!', JSON.stringify(err))
            return res.send(err)
        })
})

app.get('/meals/:id', function (req, res) {
    const id = parseInt(req.params.id)
    return db.Meal.findByPk(id)
        .then((meals) => res.send(meals))
        .catch((err) => {
            console.log('Oooops! No meals!', JSON.stringify(err))
            return res.send(err)
        })
})
app.get('/foodingredients', function (req, res) {
    return db.FoodIngredient.findAll()
        .then((foodIngredient) => {
            res.send(foodIngredient)
                // foodIngredient.forEach((function(entry) {
                //     console.log(entry.ingredientId);
                // }))

        })
        .catch((err) => {
            console.log('Oooops! No meals!', JSON.stringify(err))
            return res.send(err)
        })
})

app.post('/ingredients', jsonParser, (req, res) => {
  const { name, kcal, proteins, carbs, fats } = req.body

  return db.Ingredient.create({ name, kcal, proteins, carbs, fats })
    .then((ingredient) => res.send({ name, kcal, proteins, carbs, fats }))
    .catch((err) => {
      console.log('Oooops! Can not create an ingredient!', JSON.stringify(err))
      return res.status(400).send(err)
    })
})

app.post('/meals', jsonParser, (req, res) => {
    const { name } = req.body
    return db.Meal.create({ name, kcal:0.0, proteins:0.0, carbs:0.0, fats:0.0 })
        .then((meal) => res.send({ name}))
        .catch((err) => {
            console.log('Oooops! Can not create a meal!', JSON.stringify(err))
            return res.status(400).send(err)
        })
})


app.post('/foodingredients', jsonParser, (req, res) => {
    const { mealId, ingredientId, weight } = req.body
    return db.FoodIngredient.create({ mealId, ingredientId , weight})
        .then((FoodIngredient) => res.send({ mealId, ingredientId , weight}))
        .catch((err) => {
            console.log('Oooops! Can not create a meal!', JSON.stringify(FoodIngredient))
            return res.status(400).send(err)
        })
})




app.delete('/ingredients/:id', async (req, res) => {
    const id = parseInt(req.params.id)
     db.FoodIngredient.destroy({
        where: {
            // ingredientId: id,
            ingredientId: id
        }
    });

    return db.Ingredient.findByPk(id)
        .then((ingredient) => ingredient.destroy({ force: true , cascade:true}))
        .then(() => res.send({ id }))
        .catch((err) => {
            console.log('Oooops! Can not delete a meal', JSON.stringify(err))
            res.status(400).send(err)
        })
})


app.delete('/meals/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    db.FoodIngredient.destroy({
        where: {
            // ingredientId: id,
            mealId: id
        }
    });

    return db.Meal.findByPk(id)
        .then((meals) => meals.destroy({ force: true , cascade:true}))
        .then(() => res.send({ id }))
        .catch((err) => {
            console.log('Oooops! Can not delete a meal', JSON.stringify(err))
            res.status(400).send(err)
        })
})



// app.get('/movies/search', (req, res) => {
//   const { name, year } = req.query
//   return db.Movie.findAll({
//       where: {
//         year: {
//           [Op.eq]: year
//         },
//         name: {
//           [Op.like]: '%' + name + '%'
//         }
//       }
//     })
//     .then((movies) => res.send(movies))
//     .catch((err) => {
//       console.log('Oooops! No movies!', JSON.stringify(err))
//       return res.send(err)
//     })
// })





app.put('/meals/addingredient/:mealId', jsonParser, (req, res) => {
  const mealId = parseInt(req.params.mealId);
  const { ingredientId, weight } = req.body;

   db.Meal.findByPk(mealId)
        .then((meal) => {
        if ( meal === null ) {
        return res.status(400).send("Ooops! No movie!")
        }else{
            db.FoodIngredient.create({ mealId, ingredientId , weight})
                .then((FoodIngredient) => res.send({ mealId, ingredientId , weight}))
                .catch((err) => {
                    console.log('Oooops! Can not create a meal!', JSON.stringify(FoodIngredient))
                    return res.status(400).send(err)
                })
            db.Ingredient.findByPk(ingredientId)
                .then((ingredient) => {
                    meal.update({
                        kcal:meal.kcal  + weight * ingredient.kcal/100,
                        proteins:meal.proteins  + weight * ingredient.proteins/100,
                        carbs:meal.carbs  + weight * ingredient.carbs/100,
                        fats:meal.fats  + weight * ingredient.fats/100,
                    })
                .catch((err) => {
                console.log('Oooops! Can not create a meal!', JSON.stringify(FoodIngredient))
                return res.status(400).send(err)
            })
            })
        }
})
    })
//
//     update({
//       name:name,
//       kcal:kcal,
//       proteins:proteins,
//       carbs:carbs,
//       fats:fats
//   },{
//       where: id
//   }).then(function(rowsUpdated) {
//       res.json(rowsUpdated)
//   }).catch(next)


// app.get('/movies/:id/categories', jsonParser, (req, res) => {
//   const id = parseInt(req.params.id)
//   return db.Movie.findByPk(id)
//   .then((movie) => {
//     if ( movie === null ) {
//       return res.status(400).send("Ooops! No movie!")
//     }
//
//     return movie.getCategories()
//       .then((categories) => res.send(categories))
//       .catch((err) => {
//         console.log('Oooops! Can not add movie to a category', JSON.stringify(err))
//         res.status(400).send(err)
//       })
//   })
// })

module.exports = server;
