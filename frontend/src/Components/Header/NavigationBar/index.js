import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classnames from 'classnames'
import PropTypes from "prop-types"
import _ from 'lodash'
import styles from './styles'

class NavigationBar extends Component {
  render() {
    const {
      navigationLinks
    } = this.props

    if (navigationLinks) {
      return (
        <ul className={styles.navigationBar}>
          { navigationLinks.map(link => {
            if (link.id === 0) {
              return (
                <li key={_.uniqueId('navLink_')}>
                  <NavLink
                    className={styles.links}
                    to='/'
                  >
                    Home
                  </NavLink>
                </li>
              )
            }

            return (
              <li key={_.uniqueId('navLink_')}>
                <Link
                  className={styles.links}
                  to={link.link}
                >
                  {link.title}
                </Link>
              </li>
            )
          }) }
        </ul>
      )
    }

    return null
  }
}

NavigationBar.defaultProps = {
  navigationLinks: [
    {
      id: 0,
      name: 'General',
      link: '/'
    }
  ]
}

NavigationBar.propTypes = {
  navigationLinks: PropTypes.array
}

export default NavigationBar
