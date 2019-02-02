import React from 'react'
import {Menu,Icon} from 'antd'
import {Link} from 'react-router-dom'
import Logo from './Logo'
import Constant from './Constant'

export default class Header extends React.Component {
  state={}
  componentDidMount() {

  }
  renderMenu() {
    const username = localStorage.getItem(Constant.auth.username)
    if (typeof(username)==='string'&&username.length>0) {
      const {modules} = Constant
      const {openDrawer} = this.props
      return (
        <React.Fragment>
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
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: '63px' }}
            className="drawer-toggle"
          >
            <Menu.Item key="toggle" className="float-right" onClick={openDrawer}>
              <Icon type="bars" />{/*'\u2630'*/}
            </Menu.Item>
          </Menu>
        </React.Fragment>
      )
    }
    return null
  }
  render() {
    return (
      <React.Fragment>
        <Logo />
        {this.renderMenu()}
      </React.Fragment>
    )
  }
}
