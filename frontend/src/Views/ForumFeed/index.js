import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Trans } from 'react-i18next'
import classnames from 'classnames'

import {
  getDiscussions,
  getPinnedDiscussions,
  updateSortingMethod
} from './actions'

import Button from 'Components/Button'
import FeedBox from 'Components/FeedBox'
import SideBar from 'Components/SideBar'

import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

class ForumFeed extends Component {
  componentDidMount() {
    const {
      currentForumId,
      getDiscussions,
      getPinnedDiscussions
    } = this.props

    // get the discussions and pinned discussions
    getDiscussions(currentForumId())
    getPinnedDiscussions(currentForumId())
  }

  componentDidUpdate(prevProps) {
    const {
      currentForum,
      currentForumId,
      getDiscussions,
      getPinnedDiscussions
    } = this.props

    // get the discussions again
    // if the forum didn't matched
    if (prevProps.currentForum !== currentForum) {
      const feedChanged = true
      getDiscussions(currentForumId(), feedChanged)
      getPinnedDiscussions(currentForumId(), feedChanged)
    }
  }

  handleSortingChange(newSortingMethod) {
    const {
      currentForumId,
      getDiscussions,
      updateSortingMethod,
      sortingMethod
    } = this.props

    if (sortingMethod !== newSortingMethod) {
      updateSortingMethod(newSortingMethod)
      getDiscussions(currentForumId(), false, true)
    }
  }

  renderNewDiscussionButtion() {
    const { currentForum } = this.props

    return (
      <div className={classnames(appLayout.showOnMediumBP, styles.newDiscussionBtn)}>
        <Link to={`/${currentForum}/new_discussion`}>
          <Button type='outline' fullWidth noUppercase>
            <Trans>discussion.new</Trans>
          </Button>
        </Link>
      </div>
    )
  }

  render() {
    const {
      currentForum,
      discussions,
      fetchingDiscussions,
      pinnedDiscussions,
      fetchingPinnedDiscussions,
      sortingMethod,
      error
    } = this.props

    if (error) {
      return (
        <div className={classnames(styles.errorMsg)}>
          <Trans>{error}</Trans>
        </div>
      )
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
        <Helmet><title>{`MineForum | ${currentForum}`}</title></Helmet>

        <div className={appLayout.primaryContent}>
          <FeedBox
            type='pinned'
            loading={fetchingPinnedDiscussions}
            discussions={pinnedDiscussions}
            currentForum={currentForum}
          />

          <FeedBox
            type='general'
            loading={fetchingDiscussions}
            discussions={discussions}
            currentForum={currentForum}
            onChangeSortingMethod={this.handleSortingChange.bind(this)}
            activeSortingMethod={sortingMethod}
          />

          { this.renderNewDiscussionButtion() }
        </div>

        <div className={appLayout.secondaryContent}>
          <SideBar currentForum={currentForum} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentForum: state.app.currentForum,
    currentForumId: () => {
      const currentForumObj = _.find(state.app.forums, { slug: state.app.currentForum })
      if (currentForumObj) return currentForumObj.id
      else return null
    },
    fetchingDiscussions: state.feed.fetchingDiscussions,
    discussions: state.feed.discussions,
    fetchingPinnedDiscussions: state.feed.fetchingPinnedDiscussions,
    sortingMethod: state.feed.sortingMethod,
    pinnedDiscussions: state.feed.pinnedDiscussions,
    error: state.feed.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getDiscussions: (currentForumId, feedChanged, sortingChanged) => { dispatch(getDiscussions(currentForumId, feedChanged, sortingChanged)) },
    getPinnedDiscussions: (currentForumId, feedChanged) => { dispatch(getPinnedDiscussions(currentForumId, feedChanged)) },
    updateSortingMethod: (method) => { dispatch(updateSortingMethod(method)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForumFeed)
