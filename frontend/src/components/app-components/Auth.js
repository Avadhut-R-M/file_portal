
import React, { useState } from "react"
import { connect } from "react-redux";
import { login, signup } from "../../actions/auth-action";
import { setAuthMode } from "../../actions/auth-action";

class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passward: '',
      username: ''
    }
  }

  changeAuthMode = () => {
    this.props.setAuthMode(this.props.authmode === "signin" ? "signup" : "signin")
  }

  clickToLogin = (e) => {
    e.preventDefault()
    this.props.login(this.state.email, this.state.passward)
  }

  clickToSignup = (e) => {
    e.preventDefault()
    this.props.signup(this.state.username, this.state.email, this.state.passward)
    this.setState({email:'', passward:'', username: ''})
  }

  render(){if (this.props.authmode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary auth-link" onClick={this.changeAuthMode}>
                <a>Sign Up</a>
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => this.setState({'email':e.target.value})}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => this.setState({'passward':e.target.value})}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit"
            //   disabled={this.state}
            onClick={this.clickToLogin}
               className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary auth-link" onClick={this.changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Username"
              onChange={(e) => this.setState({'username':e.target.value})}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => this.setState({'email':e.target.value})}
            />
            <p className="text-danger">{this.state.email ? /\S+@\S+\.\S+/.test(this.state.email) ? '': 'Check Email' : ''}</p>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(e) => this.setState({'passward':e.target.value})}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" 
            onClick={this.clickToSignup}
            disabled = {this.state.email && this.state.username && this.state.passward && /\S+@\S+\.\S+/.test(this.state.email) ? '' : 'disabled'  }
            className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )}
}


const mapDispatchToProps = dispatch => {
  return {
    setAuthMode: (mode) => dispatch(setAuthMode(mode)),
    login: (email, passward) => dispatch(login(email, passward)),
    signup: (username, email, passward) => dispatch(signup(username, email, passward))
  }
}

const mapStateToProps = state => {
  return{
      authmode: state.auth.authmode,
      is_loggedin: state.user.is_loggedin
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)