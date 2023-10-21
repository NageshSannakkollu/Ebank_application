import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    inputUserId: '',
    password: '',
    showErrorMsg: false,
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMessage: errorMsg, showErrorMsg: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {inputUserId, password} = this.state
    if (password === ' ') {
      this.setState({showErrorMsg: true, errorMessage: 'Invalid User Id'})
    } else {
      const userDetails = {user_id:inputUserId, pin:password}
      const url = `https://apis.ccbp.in/ebank/login`
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }

      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    }
  }

  onChangeUserId = event => {
    this.setState({inputUserId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserId = () => {
    const {inputUserId} = this.state
    return (
      <div className="input-container">
        <label htmlFor="user">User Id</label>
        <input
          type="text"
          placeholder="Enter User Id"
          className="input-value"
          id="user"
          value={inputUserId}
          onChange={this.onChangeUserId}
        />
      </div>
    )
  }

  renderUserPin = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="password">PIN</label>
        <input
          type="password"
          placeholder="Enter PIN"
          className="input-value"
          id="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {errorMessage, showErrorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-inside-container">
          <div className="login-image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <form onSubmit={this.submitForm} className="form-container">
            <h1 className="welcome-back-heading">Welcome Back!</h1>
            <div>{this.renderUserId()}</div>
            <div>{this.renderUserPin()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMsg && <p className="error-msg">*{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
