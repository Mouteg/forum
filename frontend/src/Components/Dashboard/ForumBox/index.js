import React, { Component } from 'react'
import PropTypes from "prop-types"
import classnames from 'classnames'
import { Trans, withTranslation } from 'react-i18next'
import styles from './styles'

import Button from 'Components/Button'

class ForumBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newForumTitle: '',
      newForumSlug: '',
      errorMsg: null
    }

    this.handleCreateForum = this.handleCreateForum.bind(this)
  }

  handleCreateForum() {
    // remove any error messages
    this.setState({ errorMsg: null })

    const {
      newForumTitle,
      newForumSlug
    } = this.state

    let convertedTitle = null
    let convertedSlug = null

    // check and convert forum title
    if (newForumTitle !== '') {
      // trim any leading or ending white spaces
      convertedTitle = newForumTitle.trim()

      // check the length, 4 is hardcoded here
      if (convertedTitle.length < 4) {
        return this.setState({ errorMsg: 'error.create.forum.title.tooShort' })
      }
    } else {
      return this.setState({ errorMsg: 'error.create.forum.title.isEmpty' })
    }

    // check and confirm forum slug
    if (convertedSlug !== '') {
      const slugRegex = /^[a-z\_]+$/
      convertedSlug = newForumSlug.match(slugRegex) ? newForumSlug : null

      // length check
      if (convertedSlug && convertedSlug.length < 4) {
        return this.setState({ errorMsg: 'error.create.forum.slug.tooShort' })
      }
    } else {
      return this.setState({ errorMsg: 'error.create.forum.slug.isEmpty' })
    }

    if (!convertedTitle) { return this.setState({ errorMsg: 'error.create.forum.title.notValid' }) }
    if (!convertedSlug) { return this.setState({ errorMsg: 'error.create.forum.slug.notValid' }) }

    if (convertedTitle && convertedSlug) { this.props.createAction({ title: convertedTitle, slug: convertedSlug }) }
  }

  render() {
    const {
      forums,
      creatingForum,
      deleteAction,
      deletingForum,
      t
    } = this.props

    const {
      newForumTitle,
      newForumSlug,
      errorMsg
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.title}><Trans>forum.current</Trans></div>
        <div className={styles.forumsContainer}>
          { deletingForum && <div className={styles.loadingMsg}><Trans>forum.remove.wait</Trans></div> }

          { forums.map((forum) => <div key={forum.id} className={styles.forum}>
            <div className={styles.forumTitle}>{ forum.title }</div>
            <div className={styles.forumSlug}>({ forum.slug })</div>
            <div className={styles.removeButton}>
              <Button onClick={() => { deleteAction(forum.id) }}><Trans>forum.remove.remove</Trans></Button>
            </div>
          </div>) }

        </div>

        <div className={styles.createForumContainer}>
          { creatingForum && <div className={styles.loadingMsg}><Trans>forum.create.wait</Trans></div> }
          <div className={styles.createTitle}><Trans>forum.create.create</Trans></div>
          <div className={styles.createForum}>
            <div className={styles.createInputContainer}>
              <div className={styles.inputLabel}><Trans>forum.title</Trans></div>
              <input
                type={'text'}
                className={styles.createInput}
                placeholder={t("forum.title")}
                onChange={(e) => { this.setState({ newForumTitle: e.target.value }) }}
              />
            </div>
            <div className={styles.createInputContainer}>
              <div className={styles.inputLabel}><Trans>forum.slug</Trans></div>
              <input
                type={'text'}
                className={styles.createInput}
                placeholder={t("forum.slug")}
                onChange={(e) => { this.setState({ newForumSlug: e.target.value }) }}
              />
            </div>
            <Button onClick={this.handleCreateForum}><Trans>forum.create.create</Trans></Button>
          </div>
          { errorMsg && <div className={styles.errorMsg}><Trans>{errorMsg}</Trans></div> }
        </div>
      </div>
    )
  }
}

ForumBox.defaultProps = {
}

ForumBox.propTypes = {
  forums: PropTypes.array,
  deletingForum: PropTypes.bool,
  deleteAction: PropTypes.func,
  creatingForum: PropTypes.bool,
  createAction: PropTypes.func
}

export default withTranslation()(ForumBox)
