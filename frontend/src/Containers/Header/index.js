import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import appLayout from 'SharedStyles/appLayout'
import styles from './styles'

// components for Header
import UserMenu from 'Components/Header/UserMenu'
import Logo from 'Components/Header/Logo'
import NavigationBar from 'Components/Header/NavigationBar'
import PlaceholderImage from 'SharedStyles/placeholder.jpg'

class Header extends Component {
  renderNavLinks() {
    const { forums } = this.props

    if (forums) {
      return forums.map((forum) => {
        return {
          id: forum.id,
          title: forum.title,
          link: `/${forum.slug}`
        }
      })
    }

    return null
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

export default connect(mapStateToProps)(Header)
