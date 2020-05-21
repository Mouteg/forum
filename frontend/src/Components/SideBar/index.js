import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import PropTypes from "prop-types"
import styles from './styles'

import Button from 'Components/Button'

class SideBar extends Component {
  render() {
    const {
      currentForum,
      t
    } = this.props

    return (
      <div className={styles.sidebarContainer}>
        <Link to={`/${currentForum}/new_discussion`}>
          <Button type='outline' fullWidth noUppercase>
            { t("discussion.new") }
          </Button>
        </Link>
      </div>
    )
  }
}


SideBar.defaultProps = {
  currentForum: 'general'
}

SideBar.propTypes = {
  currentForum: PropTypes.string
}

export default withTranslation()(SideBar)
