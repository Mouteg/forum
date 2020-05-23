import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import classnames from 'classnames'
import history from "MyHistory"
import PropTypes from "prop-types"

import Button from 'Components/Button'

import styles from './styles.css'

class Profile extends Component {
  render() {
    const {
      username,
      email,
      role,
      t,
      user
    } = this.props

    var adminButton = <div></div>

    if ((user.role === "Admin") && (username == user.username)) {
      adminButton = <Button
        onClick={() => {
          history.push("/admin")
        }}
        className={styles.adminButton}
      >
        {t("Admin.panel")}
      </Button>
    }

    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{ username }</div>
          <div className={styles.nameHandler}><i className={classnames('fa fa-envelope-o', styles.mailIcon)}></i> { email }</div>
        </div>
        { adminButton }
      </div>
    )
  }
}

Profile.defaultProps = {
  username: 'Hello World',
  email: 'helloWorld',
  role: 'User'
}

Profile.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default withTranslation()(connect(mapStateToProps)(Profile))
