import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Query, Client } from 'react-apollo';
import {Match_Email} from '../../query/query';


export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passwordOne: '',
      passwordTwo: '',
      email: '',
      registered: false,
      error: '',
      userID: null,
    }
    this.forError = React.createRef();
  }

  // The next two onChange and handlefilter helps with that weird bounce issue caused by apollo and onchange
  onChange = (e, data) => {
    const value = e.target.value
    const email = this.state.email
    this.setState({
      email: value
    }, () => {
      console.log(data)
    })
  }

  handleRegister = (e) => {
    const forError = this.forError.current;
    if (this.state.passwordOne !== this.state.passwordTwo) {
      forError.innerHTML = 'The password does not match. Please try again.'
    } else {
      forError.innerHTML = ''
    }
  
    if(e.users.length >= 1) {
      forError.innerHTML = 'Sorry, but the email is taken! Please use a different one'
    } else {
      forError.innerHTML = ''
    }

    if (this.state.passwordOne === this.state.passwordTwo && e.users.length === 0) {
      e.preventDefault();
      const data = {
        'userName' : this.state.username,
        'password': this.state.passwordOne,
        'email': this.state.email
      }
    }
  }

  render() {
    const {email} = this.state;
    return (
      <Query query={Match_Email} variables={{ email}}>
        {({ loading, error, data }) => {
          if (loading) return 'loading';
          if (error) return 'error';

          return (
            <div className="Welcome">
              <div>Let's register</div>
              <Form onSubmit={e => this.handleRegister(data)}>
                <Form.Field className="login">
                  <label htmlFor="login-username">Username</label>
                  <input id="login-username" value={this.state.user} name='user' onChange={e => this.setState({ username: e.target.value })} placeholder='username' />
                </Form.Field>
                <Form.Field className="login">
                  <label htmlFor="login-email">E-mail Address</label>
                  <input id="login-email" name='email' onBlur={e => this.onChange(e, data)} placeholder={(email === '') ? 'Email' : email} />
                </Form.Field>
                <Form.Field className="login">
                  <label htmlFor="login-passwordOne">Password</label>
                  <input id="login-passwordOne" value={this.state.passwordOne} name='password' type="password" onChange={e => this.setState({ passwordOne: e.target.value })} placeholder='password' minLength="6" maxLength="15" required/>
                </Form.Field>
                <Form.Field className="login">
                  <label htmlFor="login-passwordTwo">Verify Password</label>
                  <input id="login-passwordTwo" value={this.state.passwordTwo} name='password' type="password" onChange={e => this.setState({ passwordTwo: e.target.value })} placeholder='retype password' />
                </Form.Field>
                <div className="forError" ref={this.forError}></div>
                <Button className="login-button" type='Login'>Submit Registration</Button>

              </Form>
            </div>
          )
        }}
      </Query>

    )
  }
}
