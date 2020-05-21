import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from "prop-types"
import _ from 'lodash'
import { withTranslation } from 'react-i18next'
import styles from './styles'

import Button from 'Components/Button'
import Tag from 'Components/Tag'

class TagsInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorMsg: null,
      tags: [],
      tagName: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps
    this.setState({ tags: value, errorMsg: null })
  }

  validateTag(tagName) {
    const regex = /^[a-z0-9.\-_$@*!]{4,20}$/
    return regex.test(tagName)
  }

  sameTag(tagName) {
    const { tags } = this.state
    let matched = false
    tags.map((tag) => {
      if (tag === tagName) matched = true
    })
    return matched
  }

  addTag() {
    const {
      tagName,
      tags,
      errorMsg
    } = this.state

    if (this.validateTag(tagName)) {
      if (!this.sameTag(tagName)) {
        const newTags = tags.concat(tagName)
        this.setState({
          tags: newTags,
          errorMsg: null,
          tagName: ''
        })
        this.props.onChange(newTags)
      } else {
        this.setState({ errorMsg: "error.tag.same" })
      }
    } else {
      this.setState({ errorMsg: 'error.tag.notValid' })
    }
  }

  removeTag(position) {
    const { tags } = this.state
    const newTags = [...tags.slice(0, position), ...tags.slice(position + 1, tags.length)]
    this.setState({ tags: newTags })
    this.props.onChange(newTags)
  }

  renderTags() {
    const { tags } = this.state

    return tags.map((tag, i) => {
      return (
        <Tag
          name={tag}
          key={tag}
          withRemove
          removeAction={() => { this.removeTag(i) }}
        />
      )
    })
  }

  renderInput() {
    const {
      tagName,
      tags
    } = this.state

    const { maxTagCount, t } = this.props

    if ( tags.length < maxTagCount ) {
      return (
        <div className={styles.inputContainer}>
          <input
            className={styles.tagInput}
            placeholder={t('tag.name')}
            value={tagName}
            onChange={(e) => { this.setState({ tagName: e.target.value }) }}
          />
          <Button
            className={styles.addButton}
            onClick={() => { this.addTag() }}
          >
            <i className={classnames('fa fa-plus-circle')}></i>
          </Button>
        </div>
      )
    }

    return null
  }

  render() {
    const {
      errorMsg,
      tagName,
      tags
    } = this.state

    const { maxTagCount, t } = this.props

    return (
      <div className={styles.container}>
        <div className={styles.tagContainer}>
          <div className={styles.label}>Tags :</div>
          { this.renderTags() }
          { this.renderInput() }
        </div>
        { errorMsg && <div className={styles.errorMsg}>{t(errorMsg)}</div> }
      </div>
    )
  }
}

TagsInput.defaultProps = {
  value: [],
  maxTagCount: 3,
  onChange: (tags) => {}
}

TagsInput.propTypes = {
  value: PropTypes.array,
  maxTagCount: PropTypes.number,
  onChange: PropTypes.func
}

export default withTranslation()(TagsInput)
