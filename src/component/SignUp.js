import React from 'react'
import {Alert} from 'antd'
import {Link,Redirect} from 'react-router-dom'
import Formsify from './Formsify'
import Constant from './Constant'

const info = {
  message:"Free Coins",
  description:"Sign up and get 20 coins for free as your sign up bonus",
}

export default class SignUp extends React.Component {
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
  handleChange=(value,key)=>{
    if (typeof(value)==='object'&&value!==null) {
      if (key==='username') {

      }
      this.setState({value})
    }
  }
  fetchAddresses=()=>{

  }
  validate=()=>{
    const {value} = this.state
    const errorMessages = []
    if (typeof(value)==='object'&&value!==null) {
      const {username,password,confirmPassword} = value
      if (typeof(username)==='string'&&username.length>0) {
        if (typeof(password)==='string'&&password.length>0) {
          if (typeof(confirmPassword)==='string'&&confirmPassword.length>0) {
            if (password===confirmPassword) {
              this.setState({errorMessages})
              return true
            } else {
              errorMessages.push('Please confirm your password again.')
            }
          } else {
            errorMessages.push('Please enter password for confirmation')
          }
        } else {
          errorMessages.push('Please enter password')
        }
      } else {
        errorMessages.push('Please enter username')
      }
    } else {
      errorMessages.push('Unrecognized error. Please try again.')
    }
    this.setState({errorMessages})
    return false
  }
  signUp=()=>{
    const {value} = this.state
    if (this.validate()) {
      const url = 'http://localhost:5000/register'
      fetch(url, {
        method: 'POST',
        //mode: 'no-cors',
        cache: 'no-cache',
        //credentials: 'include',
        headers: {'Content-Type':'application/json'},
        //redirect: 'follow',
        //referrer: 'no-referrer',
        body: JSON.stringify(value)
      }).then(response=>{
        return response.json()
      }).then(data=>{
        if (typeof(data)==='object'&&data!==null) {
          const {status,message} = data
          if (status) {
            this.setState({message},this.redirectToLogin)
          } else {
            const errorMessages = []
            errorMessages.push(message)
            this.setState({errorMessages})
          }
        }
      })
    }
  }
  redirectToLogin=()=>{
    this.setState({redirectToLogin:true})
  }
  handleSubmit=event=>{
    event.preventDefault()
    this.signUp()
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
    const {list,value,redirectToLogin} = this.state
    if (redirectToLogin) {
      return <Redirect to={{
        pathname: '/login',
        state: {value},
      }} />
    }
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }} className="mt-5">
        <h1 className="text-center mb-3">
          <Link to="login">Login</Link>
          <span> / </span>
          <span>Sign Up</span>
        </h1>
        <Alert {...info} type="info" className="text-center mb-4" showIcon />
        {this.renderMessage()}
        <Formsify list={list} value={value} submitLabel="Sign up" onChange={this.handleChange} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}
