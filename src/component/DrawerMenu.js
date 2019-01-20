import React from 'react'
import {Menu,Drawer} from 'antd'
import {Link} from 'react-router-dom'
import Constant from './Constant'

export default(props)=>{
  const {visible,closeDrawer} = props
  const {modules} = Constant
  return (
    <Drawer
      title="Menu"
      placement="right"
      closable
      onClose={closeDrawer}
      visible={visible}
    >
      <Menu mode="inline" defaultOpenKeys={['nav']}>
        {
          modules.map((e,i)=>{
            const {key,name} = e
            const className = ''//===key?'ant-menu-item-selected':''
            return (
              <Menu.Item key={key} className={className}>
                <Link to={`/${key}`}>{name}</Link>
              </Menu.Item>
            )
          })
        }
      </Menu>
    </Drawer>
  )
}
