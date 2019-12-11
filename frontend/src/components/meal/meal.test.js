import React from 'react'
import { shallow } from 'enzyme'

import Meal from './meal.js'

it('renders without props', () => {
  shallow(<Meal />)
})
