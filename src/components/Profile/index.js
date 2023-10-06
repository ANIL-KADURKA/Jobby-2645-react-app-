import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {
    profileData: {},
    result: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      result: apiStatusConstants.in_progress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const Data = await response.json()
      const fetchedData = Data.profile_details
      const updatedData = {
        name: fetchedData.name,
        profileImageUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.setState({
        profileData: updatedData,
        result: apiStatusConstants.success,
      })
    } else {
      this.setState({
        result: apiStatusConstants.failure,
      })
    }
  }

  onProfileRetryButton = () => {
    this.getProfileData()
  }

  renderProfileData = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileData.profileImageUrl}
          alt="profile"
          className="profile-image"
        />
        <h1 className="profile-head">{profileData.name}</h1>
        <p className="profile-bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        onClick={this.onProfileRetryButton}
        className="profile-failure-button"
      >
        Retry
      </button>
    </div>
  )

  renderLoginLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        className="load-aim"
        color="#ffffff"
        height="60"
        width="60"
      />
    </div>
  )

  render() {
    const {result} = this.state
    return (
      <>
        {(() => {
          switch (result) {
            case apiStatusConstants.in_progress:
              return this.renderLoginLoaderView()
            case apiStatusConstants.success:
              return this.renderProfileData()
            case apiStatusConstants.failure:
              return this.renderProfileFailureView()
            default:
              return null
          }
        })()}
      </>
    )
  }
}

export default Profile
