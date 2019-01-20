import React from 'react'
import {Layout} from 'antd'
import Header from './Header'
import Footer from './Footer'
import Boilerplate from './Boilerplate'
import './style.css'

export default class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <Layout.Content>
          <Boilerplate />
        </Layout.Content>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
      </Layout>
    )
  }
}
