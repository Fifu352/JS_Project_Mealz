import React from 'react'
import { shallow } from 'enzyme'

import Login from './login.js'

it('renders without props', () => {
  shallow(<Login />)
})
