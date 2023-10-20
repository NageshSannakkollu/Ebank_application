import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-container">
      <div className="logo-button-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="logo-image"
        />

        <button type="button" onClick={onClickLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="card-container">
        <h1 className="bank-vision">Your Flexibility, Our Excellence</h1>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="card-image"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
