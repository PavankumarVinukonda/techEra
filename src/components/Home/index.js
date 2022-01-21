import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseItem from '../CourcesItem'
import './index.css'

const apiStatusConstants = {
  initial: 'IINTIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Home extends Component {
  state = {
    coursesData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inprogress,
    })

    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const modifiedData = responseData.courses.map(item => ({
        id: item.id,
        logoUrl: item.logo_url,
        name: item.name,
      }))

      this.setState({
        coursesData: modifiedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCoursesContainer = () => {
    const {coursesData} = this.state

    return (
      <div className="cources-container">
        <h1 className="cources">Courses</h1>
        <ul className="courses-list-container">
          {coursesData.map(item => (
            <CourseItem key={item.id} data={item} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50px" width="50px" />
    </div>
  )

  reloadPage = () => {
    window.location.reload()
    this.getData()
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button onClick={this.reloadPage} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCoursesContainer()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        {this.renderAll()}
      </div>
    )
  }
}

export default Home
