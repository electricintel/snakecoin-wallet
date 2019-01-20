import React from 'react'
import Constant from './Constant'

export default(props)=>{
  const {name,by} = Constant.info
  const year = (new Date()).getFullYear()
  return (
    <div>{name} &copy; {year} {by}</div>
  )
}
