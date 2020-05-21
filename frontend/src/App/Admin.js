import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Trans } from 'react-i18next'

import { getUser } from './actions'

import AdminHeader from 'Containers/AdminHeader'
import Dashboard from '../Views/AdminDashboard'

import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

class AdminContainer extends Component {
  componentDidMount() {
    // fetch the user
    this.props.getUser()
  }

  render() {
    const { user } = this.props

    if (user.fetchingUser) {
      return (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Trans>Admin.loading</Trans>
        </div>
      )
    }

    if (user.role === 'Admin') {
      return (
        <div>
          <Helmet><title>MineForum | Admin</title></Helmet>
          <AdminHeader />
          <Dashboard />
        </div>
      )
    }
    else {
      return (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Trans>Admin.sorry</Trans>
          <Trans>Admin.go1</Trans><Link to='/'><Trans>Admin.go2</Trans></Link><Trans>Admin.go3</Trans>
        </div>
      )
    }

    return (
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Trans>Admin.error</Trans>
        <Trans>Admin.go1</Trans><Link to='/'><Trans>Admin.go2</Trans></Link><Trans>Admin.go3</Trans>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => { dispatch(getUser()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer)
