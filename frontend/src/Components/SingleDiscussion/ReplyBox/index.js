import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from "prop-types"
import styles from './styles.css'

import RichEditor from 'Components/RichEditor'

class ReplyBox extends Component {
  render() {
    const {
      posting,
      onSubmit,
      onChange,
      t
    } = this.props

    if (posting) return <div className={styles.loadingWrapper}>{t("opinion.post")}</div>

    return (
      <RichEditor
        type="newOpinion"
        onSave={onSubmit}
        onChange={onChange}
      />
    )
  }
}

ReplyBox.defaultProps = {
  posting: false,
  onSubmit: () => { },
  onChange: (value) => { }
}

ReplyBox.propTypes = {
  posting: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func
}

export default withTranslation()(ReplyBox)
