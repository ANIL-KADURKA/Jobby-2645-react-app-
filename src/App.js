import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css'

import Home from './components/Home'

import LoginForm from './components/LoginForm'

import Jobs from './components/Jobs'

import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'

import JobCardDetails from './components/JobCardDetails'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobCardDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)
export default App
