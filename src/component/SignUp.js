import React from 'react'
import {Link} from 'react-router-dom'
import Formsify from './Formsify'
import Constant from './Constant'

export default class Login extends React.Component {
  state={}
  componentDidMount() {
    const {auth} = Constant
    const username = localStorage.getItem(auth.username)
    const value = {username}
    const list = [
      {key:auth.username,label:'Username',placeholder:'Username'},
      {key:auth.password,label:'Password',type:'password',placeholder:'Password'},
      {key:auth.confirmPassword,label:'Confirm Password',type:'password',placeholder:'Confirm Password'},
    ]
    this.setState({value,list})
  }
  handleChange=value=>{
    if (typeof(value)==='object'&&value!==null) {
      this.setState({value})
    }
  }
  render() {
    const {list,value} = this.state
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }} className="mt-5">
        <h1 className="text-center">
          <Link to="login">Login</Link>
          <span> / </span>
          <span>Sign Up</span>
        </h1>
        <Formsify list={list} value={value} submitLabel="Sign up" onChange={this.handleChange} />
      </div>
    )
  }
}
