import { UserActionTypes } from '../ActionTypes'
import axios from 'axios'
import {
  registerUser,
  loginUser,
  logoutUser,
  changePasswordUser,
  changePhotoUser,
  interestUserGender,
  interestUserType,
  blockUser,
  rateUser
} from '../utils/users'

const intialState = {
 user:[]

}
let results ={}
let email ="";
let password = "";

const reducer =  async  (state = intialState, { type, payload }) =>{
  switch (type) {
    case UserActionTypes.REGISTER_USER:
      email = payload.email;
      password = payload.password;
       results =  await axios.post(`http://127.0.0.1:8090/api/v1/auth/register`, {email,password})
        return{
          ...state, 
          user:[
          ...state.user,
          {
          token: results.token, 
          userId:results.userId
        }]}
       
    case UserActionTypes.LOGIN_USER:
       email = payload.email;
       password = payload.password;
         results = await  loginUser(email,password)
      return {
        ...state,
        user:[...state.user,{ }]
      }
    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: logoutUser(state.users, payload)
      }
    case UserActionTypes.CHANGEPASSWORD_USER:
      return {
        ...state,
        user: changePasswordUser(state.users, payload)
      }
    case UserActionTypes.CHANGEPHOTO_USER:
      return {
        ...state,
        user: changePhotoUser(state.users, payload)
      }
    case UserActionTypes.interestUserGender:
      return {
        ...state,
        user: interestUserGender(state.users, payload)
      }
    case UserActionTypes.INTERESTTYPE_USER:
      return {
        ...state,
        user: interestUserType(state.users, payload)
      }
    case UserActionTypes.BLOCK_USER:
      return {
        ...state,
        user: blockUser(state.users, payload)
      }
    case UserActionTypes.RATE_USER:
      return {
        ...state,
        user: rateUser(state.users, payload)
      }
    default:
      return state;
  }
}
export default reducer