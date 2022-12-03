import { combineReducers } from 'redux'
import userReducer from './user.js'
import genderReducer from './gender.js'
import conversationReducer from './conversation.js'

export default combineReducers({
  users: userReducer,
  gender: genderReducer,
  conversation: conversationReducer
})