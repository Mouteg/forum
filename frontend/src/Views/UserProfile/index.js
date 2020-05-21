import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'
import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

// components used in this view
import Profile from 'Components/UserProfile/Profile'
import FeedBox from 'Components/FeedBox'

// actions
import {
  fetchUserProfile
} from './actions'

class UserProfile extends Component {
  componentDidMount() {
    const { fetchUserProfile } = this.props
    const { username } = this.props.match.params
    fetchUserProfile(username)
  }

  componentWillReceiveProps(newProps) {
    // fetch profile if different username
    const { username: oldUsername } = this.props.match.params
    const { username: futureUsername } = newProps.match.params

    // only update if different usernames
    if (oldUsername !== futureUsername) {
      const { fetchUserProfile } = this.props
      fetchUserProfile(futureUsername)
    }
  }

  render() {
    const {
      fetchingProfile,
      profile,
      error,
      t
    } = this.props

    if (error) {
      return <div className={styles.errorMsg}>{ t(error) }</div>
    }

    const {
      username,
      email,
      discussions,
      role
    } = profile

    if (fetchingProfile) {
      return (
        <div className={classnames(appLayout.constraintWidth, styles.loadingMsg)}>
          {t("profile.loading")}
        </div>
      )
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.container)}>
        <Helmet><title>{`${username} | MineForum`}</title></Helmet>

        <div className={appLayout.primaryContent}>
          <Profile
            email={email}
            username={username}
            role={role}
          />

          <FeedBox
            userProfile
            type='general'
            discussions={discussions}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    fetchingProfile: state.userProfile.fetchingProfile,
    profile: state.userProfile.profile,
    error: state.userProfile.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserProfile: (userSlug) => { dispatch(fetchUserProfile(userSlug)) }
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(UserProfile))
