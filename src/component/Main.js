import React from 'react'
import {Layout} from 'antd'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import DrawerMenu from './DrawerMenu'
import Container from './Container'
import Footer from './Footer'
import './style.css'
import './media.css'

export default class Main extends React.Component {
  state={}
  componentDidMount() {

  }
  openDrawer=()=>{this.setState({drawer:true})}
  closeDrawer=()=>{this.setState({drawer:false})}
  render() {
    const {drawer} = this.state
    return (
      <Router>
        <Layout>
          <Layout.Header>
            <Header openDrawer={this.openDrawer} />
          </Layout.Header>
          <DrawerMenu visible={drawer} closeDrawer={this.closeDrawer} />
          <Layout.Content>
            <Switch>
              <Route path="/:key" component={Container} />
              <Route path="/" component={Login} />
            </Switch>
          </Layout.Content>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Router>
    )
  }
}
