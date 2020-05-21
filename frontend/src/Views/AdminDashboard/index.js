import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import classnames from 'classnames'
import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

import {
  getAdminDashboardInfo,
  getForums,
  createForum,
  deleteForum
} from './actions'
import Counts from 'Components/Dashboard/Counts'
import ForumBox from 'Components/Dashboard/ForumBox'

class Dashboard extends Component {
  componentDidMount() {
    // get information needed for dashboard
    this.props.getAdminDashboardInfo()
  }

  render() {
    const {
      discussionCount,
      opinionCount,
      forumCount,
      userCount,
      forums
    } = this.props.adminInfo.info

    const {
      loadingInfo,
      creatingForum,
      creatingForumError,
      deletingForum,
      deletingForumError,
      t
    } = this.props

    const forumsArray = forums.map((forum) => {
      return { id: forum.id, title: forum.title, slug: forum.slug }
    })

    return (
      <div className={classnames(appLayout.constraintWidth, styles.container)}>
        { loadingInfo && <div className={classnames(styles.loadingMsg)}>
          {t("Admin.dashboard.loading")}
        </div> }

        <div className={styles.countsContainer}>
          <Counts label={t("Admin.dashboard.users")} count={userCount} />
          <Counts label={t("Admin.dashboard.discussions")} count={discussionCount} />
          <Counts label={t("Admin.dashboard.opinions")} count={opinionCount} />
          <Counts label={t("Admin.dashboard.forums")} count={forumCount} />
        </div>

        <ForumBox
          forums={forumsArray}
          deletingForum={deletingForum}
          deleteAction={(forumId) => { this.props.deleteForum(forumId) }}
          creatingForum={creatingForum}
          createAction={(forumObj) => { this.props.createForum(forumObj) }}
        />

        { creatingForumError && <div className={styles.errorMsg}>{t(creatingForumError)}</div> }
        { deletingForumError && <div className={styles.errorMsg}>{t(deletingForumError)}</div> }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    adminInfo: state.adminInfo,
    loadingInfo: state.adminInfo.loadingInfo,
    creatingForum: state.adminInfo.creatingForum,
    creatingForumError: state.adminInfo.creatingForumError,
    deletingForum: state.adminInfo.deletingForum,
    deletingForumError: state.adminInfo.deletingForumError

  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAdminDashboardInfo: () => { dispatch(getAdminDashboardInfo()) },
    getForums: () => { dispatch(getForums()) },
    deleteForum: (forumId) => { dispatch(deleteForum(forumId)) },
    createForum: (forumObj) => { dispatch(createForum(forumObj)) }
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
