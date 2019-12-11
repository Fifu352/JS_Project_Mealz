import React from 'react'
import { shallow } from 'enzyme'

import getFood from './getFood.js'

it('renders without props', () => {
  shallow(<getFood />)
})
