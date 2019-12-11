import React from 'react'
import { shallow } from 'enzyme'

import Food from './food.js'

it('renders without props', () => {
  shallow(<Food />)
})
