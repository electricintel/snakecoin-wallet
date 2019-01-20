import React from 'react'
import {Menu} from 'antd'
import {Link} from 'react-router-dom'
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
            <Menu.Item key={`${i}`}><Link to={`/${e.key}`}>{e.name}</Link></Menu.Item>
          ))
        }
      </Menu>
    </React.Fragment>
  )
}
