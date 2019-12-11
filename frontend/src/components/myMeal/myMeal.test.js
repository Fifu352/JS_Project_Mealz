import React from 'react'
import { shallow } from 'enzyme'

import myMeal from './myMeal.js'

it('renders without props', () => {
  shallow(<myMeal />)
})
