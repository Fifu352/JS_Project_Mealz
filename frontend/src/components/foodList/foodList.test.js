import React from 'react'
import { shallow } from 'enzyme'

import foodList from './foodList.js'

it('renders without props', () => {
  shallow(<foodList />)
})
