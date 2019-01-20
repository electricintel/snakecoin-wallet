import React from 'react'
import {Menu} from 'antd'
import Logo from './Logo'
import Constant from './Constant'

export default(props)=>{
  const {modules} = Constant
  return (
    <React.Fragment>
      <Logo />
      <Menu
        theme="light"
        mode="horizontal"
        //defaultSelectedKeys={['2']}
        style={{ lineHeight: '63px' }}
      >
        {
          modules.map((e,i)=>(
            <Menu.Item key={`${i}`}>{e}</Menu.Item>
          ))
        }
      </Menu>
    </React.Fragment>
  )
}
