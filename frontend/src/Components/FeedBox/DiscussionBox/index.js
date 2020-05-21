import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import PropTypes from "prop-types"
import Moment from 'moment'
import styles from './styles'

import Tag from 'Components/Tag'

class DiscussionBox extends Component {
  render() {
    const {
      voteCount,
      userName,
      email,
      discussionTitle,
      time,
      opinionCount,
      tags,
      link,
      userProfile
    } = this.props

    const postTime = Moment(time)
    const timeDisplay = postTime.from(Moment())

    return (
      <div className={styles.container}>
        <div className={classnames(styles.title, userProfile && styles.titleBottomMargin)}><Link to={link}>{discussionTitle}</Link></div>

        { !userProfile && <div className={styles.posterInfo}>
          <Link to={`/user/${userName}`} className={styles.name}>{userName}</Link>
          <div className={styles.emailHandler}>
            - <i className={classnames('fa fa-envelope-o', styles.mailIcon)}></i> {email}
          </div>
        </div> }

        <div className={styles.boxFooter}>
          <div className={styles.tagsArea}>
            { tags.map((tag) => <Tag key={tag.id} name={tag.name} />) }
          </div>

          <div className={styles.postInfo}>
            <span className={styles.info}>{timeDisplay}</span>
            <span className={styles.info}>{voteCount} favorites</span>
            <span className={styles.info}>{opinionCount} opinions</span>
          </div>
        </div>
      </div>
    )
  }
}

DiscussionBox.defaultProps = {
  discussionId: 1,
  voteCount: 20,
  userName: 'Hello World',
  userGitHandler: 'github',
  discussionTitle: 'This is a default post title',
  time: Moment(),
  opinionCount: 12,
  tags: [
    {
      id: 1,
      name: 'react',
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 2,
      name: 'redux',
      createdAt: Date.now(),
      updatedAt: Date.now()
    },
    {
      id: 3,
      name: 'nodejs',
      createdAt: Date.now(),
      updatedAt: Date.now()
    }],
  link: '',
  userProfile: false
}

DiscussionBox.propTypes = {
  discussionId: PropTypes.number,
  voteCount: PropTypes.number,
  userName: PropTypes.string,
  userGitHandler: PropTypes.string,
  discussionTitle: PropTypes.string,
  time: PropTypes.any,
  opinionCount: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.object/*(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    createdAt: PropTypes.object,
    updatedAt: PropTypes.object
  })*/),
  link: PropTypes.string,
  userProfile: PropTypes.bool
}

export default DiscussionBox
