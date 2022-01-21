import {Link} from 'react-router-dom'
import './index.css'

const CourcesItem = props => {
  const {data} = props
  const {id, logoUrl, name} = data
  return (
    <li className="list-el">
      <Link to={`/courses/${id}`} className="link">
        <img src={logoUrl} alt={name} className="tech-img" />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default CourcesItem
