import React from 'react'
import {Link,Redirect} from 'react-router-dom'
import {Alert} from 'antd'
import Formsify from './Formsify'
import Constant from './Constant'
import * as API from './API'

export default class Login extends React.Component {
  state={}
  componentDidMount() {
    const {auth} = Constant
    const {location} = this.props
    const {state={}} = location
    const {value} = state
    const list = [
      {key:auth.username,label:'Username',placeholder:'Username'},
      {key:auth.password,label:'Password',type:'password',placeholder:'Password'},
    ]
    if (typeof(value)==='object'&&value!==null) {
      this.setState({value,list})
    } else {
      const username = localStorage.getItem(auth.username)
      this.setState({value:{username},list})
    }
  }
  handleChange=value=>{
    if (typeof(value)==='object'&&value!==null) {
      this.setState({value})
    }
  }
  validate=()=>{
    const {value} = this.state
    const errorMessages = []
    if (typeof(value)==='object'&&value!==null) {
      const {username,password} = value
      if (typeof(username)==='string'&&username.length>0) {
        if (typeof(password)==='string'&&password.length>0) {
          this.setState({errorMessages})
          return true
        } else {
          errorMessages.push('Please insert your password')
        }
      } else {
        errorMessages.push('Please insert your username')
      }
    } else {
      errorMessages.push('Please insert your username and password')
    }
    this.setState({errorMessages})
    return false
  }
  login=event=>{
    event.preventDefault()
    if (this.validate()) {
      const {value} = this.state
      API.login(value,data=>{
        if (typeof(data)==='object'&&data!==null) {
          const {status,message} = data
          if (status) {
            localStorage.setItem(Constant.auth.username,value.username)
            this.setState({message},this.redirect)
          } else {
            const errorMessages = []
            errorMessages.push(message)
            this.setState({errorMessages})
          }
        }
      })
    }
  }
  redirect=()=>{
    this.setState({redirect:true})
  }
  renderMessage() {
    const {message,errorMessages} = this.state
    if (typeof(message)==='string'&&message.length>0) {
      return (
        <Alert message={message} type="success" className="text-center mb-4" showIcon />
      )
    }
    if (Array.isArray(errorMessages)&&errorMessages.length>0) {
      return errorMessages.map((e,i)=>(
        <Alert key={i} type="error" message={e} className="text-center mb-3" showIcon />
      ))
    }
    return null
  }
  render() {
    const {list,value,redirect} = this.state
    if (redirect) {
      return <Redirect to={{
        pathname: '/account',
        state: {value},
      }} />
    }
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }} className="mt-5">
        <h1 className="text-center">
          <span>Login</span>
          <span> / </span>
          <Link to="signup">Sign Up</Link>
        </h1>
        {this.renderMessage()}
        <Formsify list={list} value={value} submitLabel="Login" onChange={this.handleChange} onSubmit={this.login} />
      </div>
    )
  }
}
