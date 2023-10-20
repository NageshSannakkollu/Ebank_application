import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import LoginForm from './component/LoginForm'
import Home from './component/Home'
import NotFound from './component/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/ebank/login" component={LoginForm} />
      <Route exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
