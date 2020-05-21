import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next'
import classnames from 'classnames'

import appLayout from 'SharedStyles/appLayout'
import styles from './styles'

// components for AdminHeader
import UserMenu from 'Components/Header/UserMenu'
import Logo from 'Components/Header/Logo'
import NavigationBar from 'Components/Header/NavigationBar'
import PlaceholderImage from 'SharedStyles/placeholder.jpg'

class AdminHeader extends Component {
  renderNavLinks() {
    return [
      { title: 'Dashboard', link: '/admin' }
    ]
  }

  render() {
    const {
      authenticated,
      username,
      email
    } = this.props.user

    return (
      <div className={classnames(appLayout.constraintWidth)}>
        <div className={styles.headerTop}>
          <Logo />
          <Trans>Admin.welcome</Trans>
          <UserMenu
            signedIn={authenticated}
            userName={username}
            email={email}
          />
        </div>
        <NavigationBar
          navigationLinks={this.renderNavLinks()}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    forums: state.app.forums
  }
}

export default connect(mapStateToProps)(AdminHeader)
