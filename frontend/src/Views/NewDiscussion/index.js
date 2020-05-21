import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'

import RichEditor from 'Components/RichEditor'
import PinButton from 'Components/NewDiscussion/PinButton'
import TagsInput from 'Components/NewDiscussion/TagsInput'

import {
  postDiscussion,
  updateDiscussionTitle,
  updateDiscussionContent,
  updateDiscussionPinStatus,
  updateDiscussionTags
} from './actions'

import styles from './styles.css'
import appLayout from 'SharedStyles/appLayout.css'

class NewDiscussion extends Component {
  constructor(props) {
    super(props)

    this.state = {
      forumId: null,
      userId: null,
      fatalError: null
    }
  }

  componentDidMount() {
    const {
      user,
      currentForum,
      forums
    } = this.props

    this.setUserAndForumID(user, forums, currentForum)
  }

  componentWillReceiveProps(nextProps) {
    const {
      user,
      currentForum,
      forums
    } = nextProps

    this.setUserAndForumID(user, forums, currentForum)
  }

  setUserAndForumID(user, forums, currentForum) {
    const forumId = _.find(forums, { slug: currentForum })
    if (forumId) {
      const currentForumId = forumId.id
      this.setState({
        forumId: currentForumId,
        userId: user.id
      })
    } else {
      this.setState({
        fatalError: 'error.create.discussion.invalidForum'
      })
    }
  }

  renderEditor() {
    const {
      authenticated,
      role
    } = this.props.user

    const {
      updateDiscussionTitle,
      updateDiscussionContent,
      updateDiscussionPinStatus,
      updateDiscussionTags,
      postDiscussion,
      currentForum,
      t
    } = this.props

    const {
      title,
      content,
      tags,
      pinned
    } = this.props.newDiscussion

    const {
      forumId,
      userId
    } = this.state

    // only show the editor when user is authenticated
    if (authenticated) {
      return [
        <input
          key={'title'}
          type="text"
          className={styles.titleInput}
          placeholder={t("discussion.title")}
          value={title}
          onChange={(event) => { updateDiscussionTitle(event.target.value) }}
        />,
        (role === 'Admin') && <PinButton
          key={'pinned'}
          value={pinned}
          onChange={(value) => { updateDiscussionPinStatus(value) }}
        />,
        <TagsInput
          key={'tags'}
          value={tags}
          onChange={(tags) => { updateDiscussionTags(tags) }}
        />,
        <RichEditor
          key={'content'}
          type='newDiscussion'
          value={content}
          onChange={(value) => { updateDiscussionContent(value) }}
          onSave={() => { postDiscussion(userId, forumId, currentForum) }}
        />
      ]
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.signInMsg)}>
        {t("discussion.login")}
      </div>
    )
  }

  render() {
    const { fatalError } = this.state

    const { t } = this.props

    if (fatalError) { return (<div className={classnames(styles.errorMsg, styles.fatalError)}>{t(fatalError)}</div>) }

    const { currentForum } = this.props
    const {
      errorMsg,
      postingSuccess,
      postingDiscussion
    } = this.props.newDiscussion

    return (
      <div className={classnames(appLayout.constraintWidth, styles.content)}>
        <Helmet><title>MineForum | New Discussion</title></Helmet>

        <div className={styles.forumInfo}>
          {t("discussion.create.where1")} <span className={styles.forumName}>{currentForum}</span> {t("discussion.create.where2")}
        </div>
        <div className={styles.errorMsg}>{t(errorMsg)}</div>
        { postingSuccess && <div className={styles.successMsg}>{t("discussion.create.done")}</div> }
        { this.renderEditor() }
        { postingDiscussion && <div className={styles.postingMsg}>{t("discussion.create.wait")}</div> }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user,
    forums: state.app.forums,
    currentForum: state.app.currentForum,
    newDiscussion: state.newDiscussion
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postDiscussion: (userId, forumId, currentForum) => { dispatch(postDiscussion(userId, forumId, currentForum)) },
    updateDiscussionTitle: (value) => { dispatch(updateDiscussionTitle(value)) },
    updateDiscussionContent: (value) => { dispatch(updateDiscussionContent(value)) },
    updateDiscussionPinStatus: (value) => { dispatch(updateDiscussionPinStatus(value)) },
    updateDiscussionTags: (value) => { dispatch(updateDiscussionTags(value)) }
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(NewDiscussion))
