import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import CourseDetails from './components/courseDetail'
import NotFound from './components/notFound'
import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CourseDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
