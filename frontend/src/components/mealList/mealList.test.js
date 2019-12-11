import React from 'react'
import { shallow } from 'enzyme'

import mealList from './mealList.js'

it('renders without props', () => {
  shallow(<mealList />)
})
