import React from 'react'
import {Redirect} from 'react-router-dom'
import Constant from './Constant'

export default(props)=>{
  localStorage.removeItem(Constant.auth.username)
  return <Redirect to={{pathname: '/login'}} />
}
