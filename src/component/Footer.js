import React from 'react'
import Constant from './Constant'

export default(props)=>{
  const {by} = Constant.info
  const year = (new Date()).getFullYear()
  return (
    <div>&copy; {year} {by}</div>
  )
}
