import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    Username: '',
    Password: '',
    errorMsg: '',
    isError: false,
  }

  onChangeUsername = event => {
    this.setState({
      Username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      Password: event.target.value,
    })
  }

  onSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onFailureLogin = errorMsg => {
    console.log(errorMsg)
    this.setState({
      errorMsg,
      isError: true,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {Username, Password} = this.state
    const userDetails = {username: Username, password: Password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    if (response.ok) {
      this.onSuccess(fetchedData.jwt_token)
    } else {
      this.onFailureLogin(fetchedData.error_msg)
    }
  }

  renderUsernameField = () => {
    const {Username} = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="Username" className="label-field">
          USERNAME
        </label>
        <input
          type="text"
          id="Username"
          className="input-login-field"
          value={Username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {Password} = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="Password" className="label-field">
          PASSWORD
        </label>
        <input
          type="Password"
          id="Password"
          className="input-login-field"
          value={Password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <form className="login-card-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          {this.renderUsernameField()}
          {this.renderPasswordField()}
          <button type="submit" className="login-button">
            Login
          </button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
