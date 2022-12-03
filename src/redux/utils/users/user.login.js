import axios from 'axios'
export const loginUser =({email,password})=>{
  return  axios.post(`http://127.0.0.1:8090/api/v1/auth/login`, {email,password})
  
}