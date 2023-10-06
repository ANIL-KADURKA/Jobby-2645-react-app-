import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>
      <ul className="header-route-container">
        <li>
          <Link to="/" className="link-header">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-header">
            Jobs
          </Link>
        </li>
      </ul>
      <li>
        <button
          type="button"
          onClick={onLogoutButton}
          className="logout-button"
        >
          Logout
        </button>
      </li>
    </div>
  )
}

export default withRouter(Header)
