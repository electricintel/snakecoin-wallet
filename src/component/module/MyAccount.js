import React from 'react'
import {Redirect} from 'react-router-dom'
import {Breadcrumb,Alert} from 'antd'
import Constant from '../Constant'

export default class MyAccount extends React.Component {
  state={}
  componentDidMount() {
    this.fetch()
  }
  fetch() {
    const username = localStorage.getItem(Constant.auth.username)
    if (typeof(username)==='string'&&username.length>0) {
      const url = `http://localhost:5000/balance?${username}`
      fetch(url).then(response=>{
        return response.json()
      }).catch(e=>{
        if (typeof(e)==='object'&&e!==null) {
          const {name,message} = e
          const error = {name,message}
          this.setState({error})
        } else {
          console.error(e);
        }
      }).then(data=>{
        if (typeof(data)==='object'&&data!==null) {
          const {name,balance,timestamp} = data
          this.setState({name,balance,timestamp})
        }
      })
    } else {
      this.setState({redirect:true})
    }
  }
  renderError() {
    const {error} = this.state
    if (typeof(error)==='object'&&error!==null) {
      const {name,message} = error
      if (typeof(message)==='string'&&message.length>0) {
        return (
          <Alert message={name} description={message} type="error" showIcon />
        )
      }
    }
    return null
  }
  renderData() {
    const {name,balance,timestamp} = this.state
    if (typeof(balance)==='number') {
      return (
        <div>
          <h5>Name</h5>
          <h4>{name}</h4>
          <h3>Balance</h3>
          <h1>{balance} {'\u20b4'}</h1>
          <h5>Last transaction on</h5>
          <h4>{timestamp}</h4>
        </div>
      )
    }
    return null
  }
  render() {
    const {redirect} = this.state
    if (redirect) {
      return <Redirect to={{pathname: '/login'}} />
    }
    return (
      <div className="content">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>My Account</Breadcrumb.Item>
        </Breadcrumb>
        <div className="main-content">
          <h1>My Account</h1>
          {this.renderError()}
          {this.renderData()}
        </div>
      </div>
    )
  }
}
