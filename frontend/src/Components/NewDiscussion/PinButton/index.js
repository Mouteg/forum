import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'
import PropTypes from "prop-types"
import styles from './styles'

import Button from 'Components/Button'

class PinButton extends Component {
  constructor(props) {
    super(props)
    this.state = { value: false }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    this.setState({ value })
  }

  updateValue(value) {
    this.props.onChange(value)
    this.setState({ value })
  }

  render() {
    const { value } = this.state

    const { t } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.label}>{t("discussion.isPinned")}</div>

        <div className={styles.btnContainer}>
          <Button
            alwaysActive={value ? true : false}
            onClick={() => { this.updateValue(true) }}
          >
            {t("Yes")}
          </Button>

          <Button
            alwaysActive={!value ? true : false}
            onClick={() => { this.updateValue(false) }}
          >
            {t("No")}
          </Button>
        </div>

      </div>
    )
  }
}

PinButton.defaultProps = {
  onChange: (val) => {},
  value: false
}

PinButton.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool
}

export default withTranslation()(PinButton)
