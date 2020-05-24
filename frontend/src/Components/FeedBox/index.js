import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from "prop-types"
import Moment from 'moment'
import { Trans, withTranslation } from 'react-i18next'
import styles from './styles'

import DiscussionBox from './DiscussionBox'

class FeedBox extends Component {
  renderSort() {
    const {
      activeSortingMethod,
      onChangeSortingMethod,
      t
    } = this.props

    if (this.props.type === 'general') {
      return (
        <div className={styles.sortList}>
          <span
            className={classnames(styles.sort, (activeSortingMethod === 'date') && styles.sortActive)}
            onClick={() => onChangeSortingMethod('date')}
          >
            {t("discussion.latest")}
          </span>
          <span
            className={classnames(styles.sort, (activeSortingMethod === 'popularity') && styles.sortActive)}
            onClick={() => onChangeSortingMethod('popularity')}
          >
            {t("discussion.popular")}
          </span>
        </div>
      )
    }
    return null
  }

  renderEmptyDiscussionLine(loading, discussions) {
    if (!loading) {
      if (!discussions || discussions.length === 0) {
        return <div className={styles.loading}><Trans>discussion.no</Trans></div>
      }
    }
  }

  render() {
    const {
      type,
      loading,
      discussions,
      currentForum,
      userProfile,
      t
    } = this.props

    let discussionBoxTitle = ''
    if (type === 'general') discussionBoxTitle = t('discussion.discussions')
    if (type === 'pinned') discussionBoxTitle = t('discussion.pinned')

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>{discussionBoxTitle}</span>
          { !userProfile && this.renderSort() }
        </div>
        { loading && <div className={styles.loading}><Trans>loading</Trans></div> }
        { this.renderEmptyDiscussionLine(loading, discussions) }
        { !loading &&
          <div className={styles.discussions}>
            { discussions && discussions.map((discussion) =>
              <DiscussionBox
                userProfile={userProfile}
                key={discussion.id}
                userName={discussion.user.username}
                email={discussion.user.email}
                discussionTitle={discussion.title}
                time={discussion.createdAt}
                tags={discussion.tags}
                opinionCount={discussion.comments.length}
                voteCount={discussion.favorites.length}
                link={`/${userProfile ? discussion.catalog.slug : currentForum}/discussion/${discussion.slug}`}
              />
            ) }
          </div>
        }
      </div>
    )
  }
}

FeedBox.defaultProps = {
  type: 'general',
  loading: false,
  discussions: [],
  currentForum: 'general',
  activeSortingMethod: 'date',
  onChangeSortingMethod: (val) => { },
  userProfile: false
}

FeedBox.propTypes = {
  type: PropTypes.oneOf(['general', 'pinned']),
  loading: PropTypes.bool,
  discussions: PropTypes.array,
  currentForum: PropTypes.string,
  activeSortingMethod: PropTypes.string,
  onChangeSortingMethod: PropTypes.func,
  userProfile: PropTypes.bool
}

export default withTranslation()(FeedBox)
