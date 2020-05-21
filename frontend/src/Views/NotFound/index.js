import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

class NotFound extends Component {
  render() {
    const { t } = this.props
    return (
    <h3>{t("404")}</h3>
    )
  }
}

export default withTranslation()(NotFound)
