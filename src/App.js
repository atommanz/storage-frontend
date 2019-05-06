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



  render() {
    return (
      <div>
         <Route path="/" component={Main} />
        {/* {this.state.verified ? (
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
          )} */}
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
