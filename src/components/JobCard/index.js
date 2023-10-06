import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {IoLocationOutline} from 'react-icons/io5'

import {RiShoppingBagLine} from 'react-icons/ri'

import './index.css'

const JobCard = props => {
  const {JobEachCard} = props
  const {
    companyLogoUrl,
    rating,
    title,
    id,
    location,
    jobDescription,
    employmentType,
    packagePerAnnum,
  } = JobEachCard

  return (
    <li className="job-card-container">
      <Link to={`/jobs/${id}`} className="link-job-card">
        <div className="job-card-image-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        </div>
        <hr className="horizon-job-card" />
        <h1 className="job-card-des">Description</h1>
        <p className="job-card-despot">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
