import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'
import PropTypes from "prop-types"
import styles from './styles.css'

import Button from 'Components/Button'
import StyleButton from './StyleButton'

class InlineStyleControls extends Component {
  render() {
    const {
      onToggle,
      editorState,
      t
    } = this.props

    const inlineStyles = [
      {label: t('editor.bold'), style: 'BOLD'},
      {label: t('editor.italic'), style: 'ITALIC'},
      // {label: 'Underline', style: 'UNDERLINE'},
      {label: t('editor.monospace'), style: 'CODE'}
    ]

    const currentStyle = editorState.getCurrentInlineStyle()

    return (
      <div className={styles.controls}>
        { inlineStyles.map((eachType) =>
          <StyleButton
            key={eachType.label}
            onToggle={onToggle}
            active={currentStyle.has(eachType.style)}
            label={eachType.label}
            style={eachType.style}
          />
        ) }
      </div>
    )
  }
}

InlineStyleControls.propTypes = {
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['newDiscussion', 'newOpinion'])
}

export default withTranslation()(InlineStyleControls)
