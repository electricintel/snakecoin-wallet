import React from 'react'
import {Breadcrumb} from 'antd'

export default(props)=>{
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Transfer</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Transfer</div>
    </React.Fragment>
  )
}
