import React from 'react'
import {Breadcrumb} from 'antd'

export default(props)=>{
  return (
    <div className="content">
      <Breadcrumb>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>My Account</Breadcrumb.Item>
      </Breadcrumb>
      <div className="main-content">
        <h1>My Account</h1>
      </div>
    </div>
  )
}
