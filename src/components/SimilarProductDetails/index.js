import {AiFillStar} from 'react-icons/ai'

import {IoLocationOutline} from 'react-icons/io5'

import {RiShoppingBagLine} from 'react-icons/ri'

import './index.css'

const SimilarProductDetails = props => {
  const {SimilarProductEachDetails} = props
  const {
    jobDescription,
    location,
    companyLogoUrl,
    rating,
    title,
    employmentType,
  } = SimilarProductEachDetails

  return (
    <li className="similar-product-container-element">
      <div className="job-card-image-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="job-card-des">Description</h1>
      <p className="job-card-despot">{jobDescription}</p>
      <div className="job-card-location-container">
        <IoLocationOutline className="location" />
        <p className="job-card-location">{location}</p>
        <RiShoppingBagLine className="location" />
        <p className="job-card-location">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarProductDetails
