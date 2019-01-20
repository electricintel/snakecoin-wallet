import React from 'react'

export default class NotFound extends React.Component {
  state={}
  componentDidMount() {

  }
  render() {
    return (
      <div className="content">
        <h1>Page not found</h1>
        <div className="main-content">
          <p>404 - Page not found</p>
        </div>
      </div>
    )
  }
}
