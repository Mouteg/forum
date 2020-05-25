import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import classnames from 'classnames'
import PropTypes from "prop-types"
import styles from './styles.css'

import PlaceholderImage from 'SharedStyles/placeholder.jpg'
import Button from 'Components/Button'
import RichEditor from 'Components/RichEditor'

class Opinion extends Component {
  render() {
    const {
      opinionId,
      userAvatar,
      userName,
      email,
      opDate,
      opContent,
      userId,
      currentUserId,
      currentUserRole,
      deleteAction,
      deletingOpinion,
      t
    } = this.props

    let dateDisplay = moment(opDate)
    dateDisplay = dateDisplay.from(moment())

    const allowDelete = (userId === currentUserId) || (currentUserRole === 'Admin')

    return (
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <img className={styles.avatar} src={userAvatar} />
          <div className={styles.userInfo}>
            <Link to={`/user/${userName}`} className={styles.name}>{userName}</Link>
            <div className={styles.emailHandler}>
              <i className={classnames('fa fa-envelope-o', styles.mailIcon)}></i>
              <span>{email}</span>
            </div>
          </div>
          <div className={styles.dateInfo}>{dateDisplay}</div>
          { allowDelete && <Button className={styles.deleteButton} noUppercase onClick={() => { deleteAction(opinionId) }}>
            <i className={classnames('fa fa-trash', styles.trashIcon)}></i>
            <span>{t("delete")}</span>
          </Button> }
          {/* <Button noUppercase>Quote</Button> */}
        </div>

        <div className={styles.opContent}>
          <RichEditor
            readOnly
            value={opContent}
          />
        </div>

        { (deletingOpinion === opinionId) && <div className={styles.deletingOpinion}>{t("opinion.delete.wait")}</div> }
      </div>
    )
  }
}

Opinion.defaultProps = {
  opinionId: '12345',
  userAvatar: PlaceholderImage,
  userName: 'User name',
  userGitHandler: 'github',
  opDate: 'a day ago',
  opContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  userId: '12345',
  currentUserId: '12345',
  currentUserRole: 'user',
  deleteAction: () => {},
  deletingOpinion: null
}

Opinion.propTypes = {
  opinionId: PropTypes.string,
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  userGitHandler: PropTypes.string,
  opDate: PropTypes.any,
  opContent: PropTypes.string,
  userId: PropTypes.string,
  currentUserId: PropTypes.string,
  currentUserRole: PropTypes.string,
  deleteAction: PropTypes.func,
  deletingOpinion: PropTypes.any
}

export default withTranslation()(Opinion)
