import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'

import Header from '../Header'

import Profile from '../Profile'

import FilterGroup from '../FilterGroup'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const EmployerCheckBoxInitials = {
  FULLTIME: false,
  PARTTIME: false,
  FREELANCE: false,
  INTERNSHIP: false,
}

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
class Jobs extends Component {
  state = {
    activeJobsData: [],
    NoOfActiveJobsData: '',
    apiStatus: apiStatusConstants.initial,
    jobSearchInput: '',
    EmployerEvents: EmployerCheckBoxInitials,
    radioButtonInput: '',
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.in_progress,
    })
    const {radioButtonInput, EmployerEvents, jobSearchInput} = this.state

    const newArray = Object.entries(EmployerEvents).map(([id, checked]) => ({
      id,
      checked,
    }))
    const checkedIds = newArray.filter(emp => emp.checked).map(emp => emp.id)
    const result = checkedIds.join(',')

    console.log(radioButtonInput, jobSearchInput, result)
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${result}&minimum_package=${radioButtonInput}&search=${jobSearchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(each => ({
        id: each.id,
        rating: each.rating,
        location: each.location,
        title: each.title,
        jobDescription: each.job_description,
        employmentType: each.employment_type,
        packagePerAnnum: each.package_per_annum,
        companyLogoUrl: each.company_logo_url,
      }))
      this.setState({
        activeJobsData: updatedData,
        apiStatus: apiStatusConstants.success,
        NoOfActiveJobsData: fetchedData.total,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickJobsFailure = () => this.getJobsData()

  onChangeJobSearchInput = event => {
    this.setState({
      jobSearchInput: event.target.value,
    })
  }

  checkBoxChange = NewObject => {
    this.setState(
      prevState => ({
        EmployerEvents: {...prevState.EmployerEvents, ...NewObject},
      }),
      this.getJobsData,
    )
  }

  radioButtonChange = radioButtonInput => {
    this.setState(
      {
        radioButtonInput,
      },
      this.getJobsData,
    )
  }

  renderJobsLoaderView = () => (
    <div className="loader-jobs-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        className="load-aim-shoot"
        color="#ffffff"
        height="70"
        width="70"
      />
    </div>
  )

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
        onClick={this.onClickJobsFailure}
      >
        Retry
      </button>
    </div>
  )

  onClickSearchButton = () => this.getJobsData()

  renderInputSearchField = () => {
    const {jobSearchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="jobs-search"
          value={jobSearchInput}
          placeholder="Search"
          onChange={this.onChangeJobSearchInput}
        />
        <button
          type="button"
          onClick={this.onClickSearchButton}
          className="search-icon-button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsData = () => {
    const {activeJobsData} = this.state
    const solutionLength = activeJobsData.length > 0
    return solutionLength ? (
      <ul className="jobs-list-container">
        {activeJobsData.map(each => (
          <JobCard key={each.id} JobEachCard={each} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderFinalJobsView = () => {
    const {apiStatus, NoOfActiveJobsData} = this.state
    console.log(NoOfActiveJobsData)
    return (
      <>
        {this.renderInputSearchField()}
        {(() => {
          switch (apiStatus) {
            case apiStatusConstants.in_progress:
              return this.renderJobsLoaderView()
            case apiStatusConstants.success:
              return this.renderJobsData()
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
    const {EmployerEvents, radioButtonInput} = this.state
    return (
      <>
        <Header />
        <div className="all-jobs-container">
          <div className="all-job-section-1">
            <Profile />
            <FilterGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              checkBoxChange={this.checkBoxChange}
              radioButtonChange={this.radioButtonChange}
              EmployerEvents={EmployerEvents}
              radioButtonInput={radioButtonInput}
            />
          </div>
          <div className="all-job-section-2">{this.renderFinalJobsView()}</div>
        </div>
      </>
    )
  }
}

export default Jobs
