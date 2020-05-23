import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next'
import classnames from 'classnames'
import PropTypes from "prop-types"
import onClickOutside from 'react-onclickoutside'
import styles from './styles'

import { logOut } from "./actions"

import Button from 'Components/Button'
import URLConfig from "URLConfig"

class UserMenu extends Component {
  constructor(props) {
    super(props)
    this.state = { activeSubMenu: false }
    this.toggleSubMenu = this.toggleSubMenu.bind(this)
  }

  handleClickOutside() {
    this.setState({ activeSubMenu: false })
  }

  toggleSubMenu() {
    this.setState((prevState) => {
      return { activeSubMenu: !prevState.activeSubMenu }
    })
  }

  renderSubMenu() {
    const { activeSubMenu } = this.state
    const {
      signedIn,
      userName,
      t
    } = this.props

    if (activeSubMenu) {
      return (
        <div className={styles.subMenu}>
          <Button className={styles.subMenuClose} onClick={this.toggleSubMenu} alwaysActive>
            <i className={classnames('fa fa-close')}></i>
          </Button>

          { !signedIn && <Link className={styles.subMenuItem} to={`/login`}>
            <Button className={styles.LoginBtn} alwaysActive>
              <i className={classnames('fa fa-sign-in', styles.subMenuIcon)}></i>
              <span className={styles.btnLabel}><Trans>login.login</Trans></span>
            </Button>
          </Link> }

          { !signedIn && <Link className={styles.subMenuItem} to={`/register`}>
            <Button className={styles.LoginBtn} alwaysActive>
              <i className={classnames('fa fa-user-plus', styles.subMenuIcon)}></i>
              <span className={styles.btnLabel}><Trans>login.register</Trans></span>
            </Button>
          </Link>}

          { signedIn && <span onClick={this.toggleSubMenu}><Link className={styles.subMenuItem} to={`/user/${userName}`}><Trans>login.profile</Trans></Link></span> }
          { signedIn && <Button className={styles.subMenuItem} onClick={() => {logOut()}}><Trans>login.logout</Trans></Button> }
        </div>
      )
    }

    return null
  }

  render() {
    const {
      signedIn,
      userName,
      signOutAction
    } = this.props

    if (signedIn) {
      return (
        <div style={{ position: 'relative' }}>
          <div className={styles.container} onClick={this.toggleSubMenu}>
            <span className={styles.title}><Trans>login.hello</Trans>{userName}</span>
          </div>
          {this.renderSubMenu()}
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <Button
          alwaysActive
          className={classnames(styles.signInBtn, styles.title)}
          onClick={this.toggleSubMenu}
        >
          <Trans>login.show</Trans>
        </Button>

        {this.renderSubMenu()}
      </div>
    )
  }
}

UserMenu.defaultProps = {
  signedIn: false,
  userName: '',
  gitHandler: '',
  avatar: ''
}

UserMenu.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  gitHandler: PropTypes.string,
  avatar: PropTypes.string
}

export default onClickOutside(UserMenu)
