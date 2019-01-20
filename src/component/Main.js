import React from 'react'
import {Layout} from 'antd'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Header from './Header'
import Container from './Container'
import Footer from './Footer'
import './style.css'

export default class Main extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Layout.Header>
            <Header />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              <Route path="/:key" component={Container} />
              <Route path="/" component={Container} />
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
