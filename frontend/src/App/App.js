import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Trans, withTranslation } from 'react-i18next'

import Header from 'Containers/Header'
import Footer from 'Components/Footer'

import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

import { getForums, updateCurrentForum, getUser } from './actions'

class AppContainer extends Component {

  constructor(props){
    super(props)

    this.state = {
      lang: "en"
    }
  }

  componentDidMount() {
    const {
      updateCurrentForum,
      getForums,
      getUser
    } = this.props

    const { params } = this.props.children.props.match

    // get all forum list
    getForums()

    // check for authenticated user
    getUser()

    // set current forum based on route

    const currentForum = this.props.currentForum || ''
    updateCurrentForum(currentForum)
  }

  componentDidUpdate() {
    const {
      forums,
      currentForum,
      updateCurrentForum,
      lang
    } = this.props

    const { params } = this.props.children.props.match

    let newCurrentForum = ''

    if (params.forum) newCurrentForum = params.forum
    else if ((forums) && (forums.length > 0)) newCurrentForum = forums[0].slug
    else newCurrentForum = null

    // update current forum if necessary
    if (newCurrentForum !== currentForum) updateCurrentForum(newCurrentForum)

    if (this.state.lang != lang) {
      this.props.i18n.changeLanguage(lang)
      this.setState({
        lang
      })
    }

  }

  render() {
    const { forums } = this.props

    // render only if we get the forum lists
    if (forums) {
      return (
        <div>
          <Helmet><title>MineForum</title></Helmet>

          <Header />
          {this.props.children}
          <Footer />
        </div>
      )
    }

    return (
    <div className={styles.loadingWrapper}><Trans>Main.preloading</Trans></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    forums: state.app.forums,
    currentForum: state.app.currentForum,
    lang: state.app.lang
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getForums: () => { dispatch(getForums()) },
    updateCurrentForum: (currentForum) => { dispatch(updateCurrentForum(currentForum)) },
    getUser: () => { dispatch(getUser()) }
  }
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(AppContainer))
