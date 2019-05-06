import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import logo from '../logo-pos-1.gif';
import Cookies from 'js-cookie'
import UploadStaffData from './Upload'
import StaffData from './StaffData'
import ReduxTest from './ReduxTest'



const { Header, Sider, Content, Footer } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Main extends Component {

    // componentDidMount() {
    //     this._redirect()
    // }

    // _redirect = (props = this.props) => {
    //     const { location, history } = props
    //     if (location.pathname === '/') {
    //         history.replace(`/download`)
    //         //   this.setState({ current: `/download` })
    //     }
    // };


    handleClick = (e) => {
        // console.log('click ', e);
        if (e.key === 'logout') {
            this._onLogout()
        }
    };

    _onLogout = () => {
        Cookies.remove('pos-token')
        window.sessionStorage.removeItem('pos_role')
        window.location.href = '/pos-utils-2'
    };

    render() {
        return (

            <Layout className="layout">
                {/* <Header> */}
                <div className="logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    // defaultSelectedKeys={['1']}
                    onClick={this.handleClick}
                // style={{ lineHeight: '60px' }}

                >
                    <Menu.Item key="0"
                        disabled
                        style={{ cursor: 'context-menu' }}>
                        <img src={logo} style={{ height: 35, cursor: 'context-menu' }} alt="logo" />
                    </Menu.Item>

                    {window.sessionStorage.getItem('pos_role') === 'admin' || window.sessionStorage.getItem('pos_role') === 'developer'
                        ? (
                            <Menu.Item key="1">
                                <Link to="/pos-utils-2/upload">
                                    <Icon type="download" theme="outlined" />Upload Staff Data
                                </Link>
                            </Menu.Item>
                        )
                        : ''}

                    {window.sessionStorage.getItem('pos_role') === 'admin' || window.sessionStorage.getItem('pos_role') === 'developer' || window.sessionStorage.getItem('pos_role') === 'staffdata'
                        ? (
                            <Menu.Item key="2">

                                <Link to="/pos-utils-2/staff">
                                    <Icon type="user" theme="outlined" />Staff Data</Link>
                            </Menu.Item>
                        )
                        : ''}

                    {window.sessionStorage.getItem('pos_role') === 'developer'
                        ? (
                            <Menu.Item key="3">

                                <Link to="/pos-utils-2/redux">
                                    <Icon type="user" theme="outlined" />ReduxTest</Link>
                            </Menu.Item>
                        )
                        : ''}
                    <SubMenu title={<span className="submenu-title-wrapper">
                        <Icon type="user" />
                        {Cookies.get('pos-token') ? Cookies.get('pos-token') : 'Login'}</span>} style={{ float: 'right' }}>
                        <Menu.Item key="logout">
                            <Icon type="logout" />Logout</Menu.Item>
                    </SubMenu>





                </Menu>
                {/* </Header> */}


                <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
                    <Switch>

                        <Route path="/pos-utils-2/upload" component={UploadStaffData} />
                        <Route path="/pos-utils-2/staff" component={StaffData} />
                        <Route path="/pos-utils-2/redux" component={ReduxTest} />
                        {/* <Route path="/kassone/config" component={Config} />

                        <Route path="/kassone/scheduleJobs/edit/:id" component={scheduleJobsEdit} />

                        <Route path="/kassone/scheduleJobs" component={scheduleJobs} />

                        <Route path="/kassone/manageDBs" component={manageDBs} /> */}


                        <Redirect from='*' to='/pos-utils-2/staff' />

                    </Switch>

                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    POS UTILS
      </Footer>
            </Layout>
        )
    }
}

export default Main