import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import classnames from 'classnames'
import PropTypes from "prop-types"
import styles from './styles.css'

import PlaceholderImage from 'SharedStyles/placeholder.jpg'
import Button from 'Components/Button'
import Tag from 'Components/Tag'
import RichEditor from 'Components/RichEditor'

class Discussion extends Component {
  render() {
    const {
      id,
      userName,
      email,
      discTitle,
      discDate,
      discContent,
      tags,
      favoriteCount,
      favoriteAction,
      userFavorited,
      toggleingFavorite,
      allowDelete,
      deletingDiscussion,
      deleteAction,
      t
    } = this.props

    let dateDisplay = moment(discDate)
    dateDisplay = dateDisplay.from(moment())

    let favCount = ''
    if (toggleingFavorite) favCount = t('discussion.favorite.toggling')
    else if (userFavorited) favCount = t("discussion.favorite.youLike", { favoriteCount })
    else if (favoriteCount === 0) favCount = t("discussion.favorite.make")
    else if (favoriteCount === 1) favCount = t("discussion.favorite.one")
    else favCount = t("discussion.favorite.many", { favoriteCount })

    return (
      <div className={styles.container}>

        <div className={styles.infoContainer}>
          <div className={styles.columnOnSmallBP}>
            <div className={styles.userInfo}>
              <Link to={`/user/${userName}`} className={styles.name}>{userName}</Link>
              <div className={styles.emailHandler}>
                <i className={classnames('fa fa-envelope-o', styles.mailIcon)}></i>
                <span>{email}</span>
              </div>
            </div>
            <div className={styles.dateInfo}>{dateDisplay}</div>
          </div>
        </div>

        <div className={styles.discTitle}>{discTitle}</div>
        <div className={styles.discContent}>
          <RichEditor
            readOnly={true}
            value={discContent}
          />
        </div>

        <div className={styles.discFooter}>
          <div className={styles.tags}>
            { tags.map(tag => <Tag name={tag.name} key={tag.id} />)}
          </div>
          <Button noUppercase className={styles.favoriteButton} onClick={() => { !toggleingFavorite && favoriteAction(id) }}>
            <i className={classnames(`fa fa-${userFavorited ? 'heart' : 'heart-o'}`)}></i>
            <span>{favCount}</span>
          </Button>

          { allowDelete && <Button noUppercase className={styles.deleteButton} onClick={() => { deleteAction() }}>
            <i className={classnames('fa fa-trash', styles.trashIcon)}></i>
            <span>{t("delete")}</span>
          </Button> }
        </div>

        { deletingDiscussion && <div className={styles.deletingDiscussion}>
          {t("discussion.deleting")}
        </div> }
      </div>
    )
  }
}

Discussion.defaultProps = {
  id: 0,
  userAvatar: PlaceholderImage,
  userName: 'User name',
  userGitHandler: 'github',
  discTitle: 'Default Discussion Title',
  discDate: 'a day ago',
  discContent: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  tags: [ 'react', 'redux', 'webkit' ],
  favoriteCount: 1,
  favoriteAction: () => { },
  userFavorited: false,
  toggleingFavorite: false,
  allowDelete: false,
  deletingDiscussion: false,
  deleteAction: () => { }
}

Discussion.propTypes = {
  id: PropTypes.any,
  userAvatar: PropTypes.string,
  userName: PropTypes.string,
  userGitHandler: PropTypes.string,
  discTitle: PropTypes.string,
  discDate: PropTypes.any,
  discContent: PropTypes.any,
  tags: PropTypes.arrayOf(PropTypes.object),
  favoriteCount: PropTypes.number,
  favoriteAction: PropTypes.func,
  userFavorited: PropTypes.bool,
  toggleingFavorite: PropTypes.bool,
  allowDelete: PropTypes.bool,
  deletingDiscussion: PropTypes.bool,
  deleteAction: PropTypes.func
}

export default withTranslation()(Discussion)
