import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import Button from "Components/Button"
import { setLanguage } from './actions'

import styles from './styles'
import appLayout from 'SharedStyles/appLayout.css'

class Footer extends Component {
  render() {
    const year = new Date()
    return (
      <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
        Copyright {year.getFullYear()} PlantySnake<br />
        <Button onClick={() => this.props.setLanguage("en")} disabled="false">English</Button> <Button onClick={() => this.props.setLanguage("ru")}>Russian</Button>
      </div>
    )
  }
}

Footer.defaultProps = {
}

Footer.propTypes = {
}

function mapDispatchToProps(dispatch) {
  return {
    setLanguage: (lang) => { dispatch(setLanguage(lang)) }
  }
}

export default connect(null, mapDispatchToProps)(Footer)
