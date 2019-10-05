import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
<Link to="/login">Login Here</Link><p></p>
<Link to="/register">Register Here</Link>
    </div>
    )
  }
}
