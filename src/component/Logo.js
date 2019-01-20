import React from 'react'
import Constant from './Constant'

export default(props)=>{
  const {icon,name} = Constant.info
  return (
    <div className="logo">
      {icon} {name}
    </div>
  )
}
