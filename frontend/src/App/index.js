import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import styles from './styles'

// app store
import appStore from './store'

// app views
import AppContainer from './App'
import AdminContainer from './Admin'
import ForumFeed from '../Views/ForumFeed'
import SingleDiscussion from '../Views/SingleDiscussion'
import NewDiscussion from '../Views/NewDiscussion'
import UserProfile from '../Views/UserProfile'
import NotFound from '../Views/NotFound'
import RegisterPage from '../Views/Login/RegisterPage'
import LoginPage from '../Views/Login/LoginPage'
import history from 'MyHistory'

// localization stuff
import { I18nextProvider } from "react-i18next"
import i18n from "locale/i18n"

const withAppLayout = Component => props => <AppContainer><Component {...props} /></AppContainer>

const AppRoute = ({ component, ...props }) => (
  <Route {...props} component={withAppLayout(component)} />
)

ReactDOM.render (
  <I18nextProvider i18n={i18n}>
    <Provider store={appStore}>
      <Router history={ history } >
        <Switch>
          <Route path="/admin" exact component={AdminContainer} />
          <AppRoute path="/register" exact component={RegisterPage} />
          <AppRoute path="/login" exact component={LoginPage} />
          <AppRoute path="/" exact component={ForumFeed} />
          <AppRoute path="/user/:username" component={UserProfile} />
          <AppRoute path="/:forum/discussion/:discussion" component={SingleDiscussion} />
          <AppRoute path="/:forum/new_discussion" component={NewDiscussion} />
          <AppRoute path="/:forum" component={ForumFeed} />
          <AppRoute path="*" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
)
