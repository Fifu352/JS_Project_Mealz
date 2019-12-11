import React from 'react'
import { shallow } from 'enzyme'

import addMeal from './addMeal.js'

it('renders without props', () => {
  shallow(<addMeal />)
})
