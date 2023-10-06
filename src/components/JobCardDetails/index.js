import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'

import {IoLocationOutline} from 'react-icons/io5'

import {RiShoppingBagLine} from 'react-icons/ri'

import SimilarProductDetails from '../SimilarProductDetails'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobCardDetails extends Component {
  state = {
    activeJobCardDetails: {},
    similarDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobCardDetails()
  }

  getJobCardDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.in_progress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const Hello = fetchedData.job_details
      const updatedData = {
        companyLogoUrl: Hello.company_logo_url,
        companyWebsiteUrl: Hello.company_website_url,
        employmentType: Hello.employment_type,
        id: Hello.id,
        jobDescription: Hello.job_description,
        location: Hello.location,
        packagePerAnnum: Hello.package_per_annum,
        rating: Hello.rating,
        skills: Hello.skills.map(skill => ({
          name: skill.name,
          imageUrl: skill.image_url,
        })),
        title: Hello.title,
        lifeAtCompany: {
          description: Hello.life_at_company.description,
          imageUrl: Hello.life_at_company.image_url,
        },
      }

      const similarData = fetchedData.similar_jobs.map(similar => ({
        id: similar.id,
        jobDescription: similar.job_description,
        location: similar.location,
        companyLogoUrl: similar.company_logo_url,
        rating: similar.rating,
        title: similar.title,
        employmentType: similar.employment_type,
      }))

      this.setState({
        activeJobCardDetails: updatedData,
        similarDetails: similarData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickJobCardDetailsFailure = () => this.getJobCardDetails()

  renderJobsFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="failure-job-image"
        alt="failure view"
      />
      <h1 className="jobs-failure-head">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="profile-failure-button"
        type="button"
        onClick={this.onClickJobCardDetailsFailure}
      >
        Retry
      </button>
    </div>
  )

  renderJobsCardLoaderView = () => (
    <div className="loader-jobs-card-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="70" width="70" />
    </div>
  )

  renderSimilarCardDetails = () => {
    const {similarDetails} = this.state
    return (
      <ul className="silly-similar-container">
        {similarDetails.map(each => (
          <SimilarProductDetails
            SimilarProductEachDetails={each}
            key={each.id}
          />
        ))}
      </ul>
    )
  }

  renderJobsCardDetailsView = () => {
    const {activeJobCardDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
      lifeAtCompany,
    } = activeJobCardDetails
    console.log(id, companyWebsiteUrl)
    const description1 = lifeAtCompany.description
    const imageUrl1 = lifeAtCompany.imageUrl
    return (
      <div className="job-card-details-container">
        <div className="job-card-image-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-card-image"
          />
          <div className="job-card-rating-container">
            <h1 className="job-card-title">{title}</h1>
            <div className="job-card-star-container">
              <AiFillStar className="job-card-star" />
              <p className="job-card-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-location-container">
          <IoLocationOutline className="location" />
          <p className="job-card-location">{location}</p>
          <RiShoppingBagLine className="location" />
          <p className="job-card-location">{employmentType}</p>
          <p className="job-card-annual">{packagePerAnnum}</p>
          <a
            href={companyWebsiteUrl}
            className="link-element-anchor"
            target="_blank"
            rel="noreferrer"
          >
            Visit
          </a>
        </div>
        <hr className="horizon-job-card" />
        <h1 className="job-card-des">Description</h1>
        <p className="job-card-despot">{jobDescription}</p>
        <h1>Skills</h1>
        <ul className="skills-container">
          {skills &&
            skills.map(each => (
              <li className="skills-element" key={each.name}>
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skill-image"
                />
                <p className="skill-name">{each.name}</p>
              </li>
            ))}
        </ul>
        <h1>Life At Company</h1>
        <div className="life-company">
          <p>{description1}</p>
          <img
            src={imageUrl1}
            alt="life at company"
            className="company-image"
          />
        </div>
      </div>
    )
  }

  renderFinalJobsCardsView = () => {
    const {apiStatus} = this.state
    return (
      <>
        {(() => {
          switch (apiStatus) {
            case apiStatusConstants.in_progress:
              return this.renderJobsCardLoaderView()
            case apiStatusConstants.success:
              return (
                <>
                  {this.renderJobsCardDetailsView()}
                  <h1 className="location">Similar Jobs</h1>
                  {this.renderSimilarCardDetails()}
                </>
              )
            case apiStatusConstants.failure:
              return this.renderJobsFailureView()
            default:
              return null
          }
        })()}
      </>
    )
  }

  render() {
    const {similarProductDetails} = this.state
    console.log(similarProductDetails)

    return (
      <>
        <Header />
        <div className="Final-job-card-details-container">
          {this.renderFinalJobsCardsView()}
        </div>
      </>
    )
  }
}

export default JobCardDetails
