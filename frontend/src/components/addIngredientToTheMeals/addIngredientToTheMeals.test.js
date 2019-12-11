import React from 'react'
import { shallow } from 'enzyme'

import addIngredientToTheMeals from './addIngredientToTheMeals.js'

it('renders without props', () => {
  shallow(<addIngredientToTheMeals />)
})
