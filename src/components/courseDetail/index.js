import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
}

class CourseDetail extends Component {
  state = {
    courseDetails: [],
    apiStaus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStaus: apiStatusConstants.inprogress,
    })
    const url = `https://apis.ccbp.in/te/courses/${id}`

    const response = await fetch(url)
    if (response.ok) {
      const responseData = await response.json()
      const modifiedData = {
        id: responseData.course_details.id,
        description: responseData.course_details.description,
        imageUrl: responseData.course_details.image_url,
        name: responseData.course_details.name,
      }

      this.setState({
        courseDetails: modifiedData,
        apiStaus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStaus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50px" width="50px" />
    </div>
  )

  renderCourseDetailsContainer = () => {
    const {courseDetails} = this.state
    const {description, imageUrl, name} = courseDetails
    return (
      <div className="course-details-container">
        <img src={imageUrl} alt={name} className="course-img" />
        <div className="details-container">
          <h1 className="heading">{name}</h1>
          <p className="paragraph">{description}</p>
        </div>
      </div>
    )
  }

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
    const {apiStaus} = this.state

    switch (apiStaus) {
      case apiStatusConstants.inprogress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderCourseDetailsContainer()
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

export default CourseDetail
