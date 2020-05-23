import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import classnames from 'classnames'

import { registerUser } from './actions'

import Button from 'Components/Button'

import appLayout from 'SharedStyles/appLayout.css'
import styles from './styles.css'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
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
      const { registerUser } = this.props
      const { username, password, email } = this.state
      registerUser(username, password, email)
    }

    render() {
        const { t } = this.props

        const {
          registering,
          errorMsg
        } = this.props.register

        const { username, password, email } = this.state
        return (
            <div className={classnames(appLayout.constraintWidth, styles.container)}>
              <Helmet><title>MineForum | Login</title></Helmet>

              <div className={classnames(styles.content)}>
                <h2>{t("login.register")}</h2>
                <div className={styles.errorMsg}>{t(errorMsg)}</div>
                <br />
                <div className='form-group'>
                    <label htmlFor="username">{t("login.username")}</label>
                    <input type="text" className={classnames(styles.input)} name="username" value={username} onChange={this.handleChange} />
                </div>
                <br />
                <div className='form-group'>
                    <label htmlFor="email">{t("login.email")}</label>
                    <input type="email" className={classnames(styles.input)} name="email" value={email} onChange={this.handleChange} />
                </div>
                <br />
                <div className='form-group'>
                    <label htmlFor="password">{t("login.password")}</label>
                    <input type="password" className={classnames(styles.input)} name="password" value={password} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <Button className={classnames(styles.buttonClass)} style={{ alignSelf: 'center' }} onClick={() => { this.handleSubmit() }}>{t("login.register")}</Button>
                    { registering && <div className={styles.LoginMsg}>{t("discussion.create.wait")}</div> }
                </div>
              </div>
            </div>
        )
    }
}

function mapStateToProps(store) {
    return {
      register: store.register
    }
}

const mapDispatchToProps = {
  registerUser: registerUser
}

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(RegisterPage))
