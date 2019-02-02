import React from 'react'
import {Redirect} from 'react-router-dom'
import {Table,Breadcrumb,Alert} from 'antd'
import Constant from '../Constant'

export default class History extends React.Component {
  state={}
  componentDidMount() {
    this.fetch()
  }
  fetch() {
    const username = localStorage.getItem(Constant.auth.username)
    if (typeof(username)==='string'&&username.length>0) {
      const url = `http://localhost:5000/history?${username}`
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
          const {name,history,timestamp} = data
          this.setState({name,history,timestamp})
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
    const {name,timestamp} = this.state
    return (
      <div>
        <h5>Name</h5>
        <h4>{name}</h4>
        <h5>Last transaction on</h5>
        <h4>{timestamp}</h4>
        <div className="mb-5" />
        {this.renderList()}
      </div>
    )
  }
  renderList() {
    const {history} = this.state
    if (Array.isArray(history)&&history.length>0) {
      const columns = [
        {key:'from',dataIndex:'from',title:'From'},
        {key:'to',dataIndex:'to',title:'To'},
        {key:'amount',dataIndex:'amount',title:'Amount'},
      ]
      const dataSource = history.reverse().map((e,i)=>{
        const data = {...e}
        data.key = `${i}`
        return data
      })
      return (
        <Table dataSource={dataSource} columns={columns} />
      )
    }
    return <Alert message="Empty" type="info" showIcon />
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
          <Breadcrumb.Item>History</Breadcrumb.Item>
        </Breadcrumb>
        <div className="main-content">
          <h1>History</h1>
          {this.renderError()}
          {this.renderData()}
        </div>
      </div>
    )
  }
}
