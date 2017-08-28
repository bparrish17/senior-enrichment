'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
// import Main from './components/Main'
import Root from './components/Root'

/* ACTIONS
--- as a user I...
* can create a campus
* can edit a campus's info, including adding/removing a student to/from that campus * can delete a campus
* can create a student
* can edit a student's info, including the campus that student is assigned to
* can delete a student

*/

render (
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('main')
)