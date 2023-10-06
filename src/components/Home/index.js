import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <Header style={{margin: 0}} />
    <div className="home-container">
      <div className="home-card-container">
        <h1 className="home-head">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs,salary information, company
          reviews.Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="home-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
