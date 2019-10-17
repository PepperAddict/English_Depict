import React, { Component } from 'react';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Welcome">
Helloooooo
if you want to login go here: 
<p></p>
<a href="/dashboard">Dashboard</a><br></br>
<a href="/login">Login</a><br></br>
<a href="/register">Register</a>
    </div>
    )
  }
}
