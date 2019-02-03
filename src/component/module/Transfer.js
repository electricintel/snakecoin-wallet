import React from 'react'
import {Redirect} from 'react-router-dom'
import {Row,Col,Breadcrumb,Alert,Input,Icon,Button} from 'antd'
import Constant from '../Constant'
import * as API from '../API'

export default class Transfer extends React.Component {
  state={}
  componentDidMount() {
    this.fetch()
  }
  fetch() {
    const username = localStorage.getItem(Constant.auth.username)
    if (typeof(username)==='string'&&username.length>0) {
      API.balance(username,data=>{
        if (typeof(data)==='object'&&data!==null) {
          const {name,balance,timestamp} = data
          this.setState({name,balance,timestamp})
        }
      },e=>{
        if (typeof(e)==='object'&&e!==null) {
          const {name,message} = e
          const error = {name,message}
          this.setState({error})
        } else {
          console.error(e);
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
  renderValidationMessages() {
    const {validation} = this.state
    if (typeof(validation)==='object'&&validation!==null) {
      const {messages} = validation
      if (Array.isArray(messages)&&messages.length>0) {
        return messages.map((e,i)=>{
          if (typeof(e)==='string'&&e.length>0) {
            return (
              <Alert key={i} message={e} type="error" showIcon className="mb-3" />
            )
          }
          return null
        })
      }
    }
    return null
  }
  renderData() {
    const {name,balance} = this.state
    if (typeof(balance)==='number') {
      return (
        <div className="mb-4">
          <h3>Transfer from</h3>
          <h2>{name}</h2>
          <h4>Current balance</h4>
          <h4>{balance} {'\u20b4'}</h4>
        </div>
      )
    }
    return null
  }
  emitEmpty=()=>{
    this.input.focus()
    this.setState({to:''})
  }
  handleChange=e=>{
    this.setState({to:e.target.value})
  }
  handleChangeAmount=e=>{
    const amount = e.target.value
    this.setState({amount})
  }
  handleSubmit=e=>{
    e.preventDefault()
    const {name,to,amount} = this.state
    if (this.validate()) {
      const value = {
        from: name, to, amount: parseInt(amount),
      }
      const url = 'http://localhost:5000/transfer'
      fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(value)
      }).then(response=>{
        return response.json()
      }).then(data=>{
        if (typeof(data)==='object'&&data!==null) {
          //{status: true, timestamp: "2019-02-03 03:37:11.956160", message: "Successfully transfer from h to a with amount of 1"}
          const {status,message,timestamp} = data
          this.setState({status,message,timestamp}, ()=>{
            this.fetch()
          })
        }
      })
    }
  }
  validate=()=>{
    const {to,amount} = this.state
    const messages = []
    let valid = true
    if (typeof(to)==='string'&&to.length>0) {

    } else {
      valid = false
      messages.push('Please enter the name whom you want to transfer to')
    }
    let amt
    if (typeof(amount)==='string'&&amount.length>0) {
      amt = parseInt(amount)
    }
    if (typeof(amt)==='number') {

    } else {
      valid = false
      messages.push('Please enter an integer')
    }
    const validation = {messages}
    this.setState({validation})
    return valid
  }
  renderForm() {
    const {to,amount} = this.state
    const suffix = to?<Icon type="close-circle" onClick={this.emitEmpty} />:null
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Transfer to</h3>
        <Input
          placeholder="To whom?"
          prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
          suffix={suffix}
          value={to}
          onChange={this.handleChange}
          ref={el=>this.input=el}
          className="mb-3"
        />
        <h3>Amount</h3>
        <Input
          placeholder="How much?"
          suffix={'\u20b4'}
          value={amount}
          type="number"
          onChange={this.handleChangeAmount}
          className="mb-3"
        />
        <Button type="primary" htmlType="submit" size="large">Transfer now<Icon type="arrow-right" /></Button>
      </form>
    )
  }
  renderMessage() {
    const {status,message} = this.state
    if (status) {
      return (
        <Alert message={message} type="success" showIcon className="mb-3" />
      )
    }
    if (typeof(message)==='string'&&message.length>0) {
      return (
        <Alert message={message} type="warning" showIcon className="mb-3" />
      )
    }
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
          <h1>Transfer</h1>
          {this.renderMessage()}
          {this.renderError()}
          {this.renderValidationMessages()}
          <Row>
            <Col xs={24} sm={12} md={12} lg={12}>
              {this.renderData()}
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              {this.renderForm()}
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
