import React, { Component } from 'react';
import styled from 'styled-components'
import VerticalCentered from './components/styled/VerticalCentered'
import HorizontalCentered from './components/styled/HorizontalCentered'
import logo from './octopus.svg'
import Cookies from 'js-cookie'
import { Form, Icon, Input, Button, Layout, Alert } from 'antd'
import { apiFetch, getTheme } from './helpers'
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import './App.css';
import 'antd/dist/antd.css'
import Main from './pages/Main'
import './custom-antd.less'

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      verifying: true,
      verified: false,
      readOnly: false,
      email: '',
      password: '',
      loggingIn: false,
      query: {},
    }
  }

  componentWillMount() {
    if (Cookies.get('pos-token') && window.sessionStorage.getItem('pos_role')) {
      console.log('aa')
      this.setState({
        verified: true,
      })
    }
  }


  nextPath(path) {
    this.props.history.push(path);
  }

  _onLogin = (e) => {
    e.preventDefault()
    this.setState({ loggingIn: true }, async () => {
      apiFetch({
        url: '/user/login',
        method: 'POST',
        body: {
          username: this.state.email,
          password: this.state.password,
        },
      }).then(async (res) => {
        // console.log('res', res)
        if (res.success) {
          // console.log(res.data)
          // Cookies.set('kassone-token', res.data.sAMAccountName)
          await this._onVerify(res.data.sAMAccountName)
          this.setState({
            loggingIn: false,
          })
          // , async () => { this._verify() })
        } else {
          this.setState({
            loggingIn: false,
            errorMessage: (res.message ? 'Username หรือ Password ไม่ถูกต้อง' : 'Username หรือ Password ไม่ถูกต้อง'),
          })
        }
      })
    })
  }

  _onVerify = (e) => {
    // e.preventDefault()
    apiFetch({
      url: '/user/verify',
      method: 'POST',
      body: {
        username: e,
      },
    }).then(async (res) => {
      if (res.success) {
        console.log(res)
        console.log(res.data.role)
        // console.log(res.data)
        Cookies.set('pos-token', res.data.username)
        window.sessionStorage.setItem('pos_role', res.data.role)
        // await Cookies.set('kassone-role-user', res.data.role)
        this.setState({
            verified: true,
          })
        // , async () => { this._verify() })
      } else {
        this.setState({
          loggingIn: false,
          errorMessage: (res.message ? 'ขอสิทธิการเข้าได้ที่ IT' : 'ขอสิทธิการเข้าได้ที่ IT'),
        })
      }


    })
  }



  render() {
    return (
      <div>
        {this.state.verified ? (
          <Route path="/" component={Main} />
        ) :
          (
            <LoginContainer height="100vh">
              <LoginVerticalContainer>
                <img src={logo} style={{ height: 150, marginBottom: 40 }} alt="" />
                <Form onSubmit={this._onLogin} className="login-form">
                  <FormItem>
                    <Input onChange={e => this.setState({ email: e.target.value })} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                  </FormItem>
                  <FormItem>
                    <Input onChange={e => this.setState({ password: e.target.value })} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  </FormItem>
                  <FormItem>
                    <Button loading={this.state.loggingIn} type="primary" size="large" htmlType="submit" className="login-form-button">
                      Log in
                  </Button>
                  </FormItem>
                </Form>
                {this.state.errorMessage ? (<Alert message={this.state.errorMessage} type="error" />) : ''}
              </LoginVerticalContainer>
            </LoginContainer>
          )}
      </div>

    );
  }
}


const LoginVerticalContainer = styled(VerticalCentered)`
  width: 260px;
`

const LoginContainer = styled(HorizontalCentered)`
  background-color: #5D6D7E;
  height: 100vh;
`

const LoadingContainer = styled(HorizontalCentered)`
  background-color: ${getTheme`colorGray`};
`

const Loader = styled(Icon)`
  font-size: 24px;
  color: ${getTheme`colorOrange`};
`



export default App;
