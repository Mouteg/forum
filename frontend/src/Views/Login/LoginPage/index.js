import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'

import { loginUser } from './actions'

import Button from 'Components/Button'

import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleSubmit() {
      const { loginUser } = this.props
      const { username, password } = this.state
      loginUser(username, password)
    }

    render() {
        const { t } = this.props

        const {
          loggingIn,
          errorMsg
        } = this.props.login

        const { username, password } = this.state
        return (
            <div className={classnames(appLayout.constraintWidth, styles.container)}>
              <Helmet><title>MineForum | Login</title></Helmet>

              <div className={classnames(styles.content)}>
                <h2>{t("login.login")}</h2>
                <div className={styles.errorMsg}>{t(errorMsg)}</div>
                <br />
                <div className='form-group'>
                    <label htmlFor="username">{t("login.username")}</label>
                    <input type="text" className={classnames(styles.input)} name="username" value={username} onChange={this.handleChange} />
                </div>
                <br />
                <div className='form-group'>
                    <label htmlFor="password">{t("login.password")}</label>
                    <input type="password" className={classnames(styles.input)} name="password" value={password} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <Button className={classnames(styles.buttonClass)} style={{ alignSelf: 'center' }} onClick={() => { this.handleSubmit() }}>{t("login.login")}</Button>
                    { loggingIn && <div className={styles.LoginMsg}>{t("login.login.wait")}</div> }
                    <Link to="/register"><Button className={classnames(styles.buttonClass)} style={{ alignSelf: 'center' }}>{t("login.register")}</Button></Link>
                </div>
              </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
      login: store.login
    }
}

const mapDispatchToProps = {
  loginUser: loginUser
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
