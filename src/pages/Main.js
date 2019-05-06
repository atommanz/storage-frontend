import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import logo from '../logo-pos-1.gif';
import Cookies from 'js-cookie'
import StoragePage from './Storage'



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
        window.location.href = '/'
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
                    {/* <Menu.Item key="0"
                        disabled
                        style={{ cursor: 'context-menu' }}>
                        <img src={logo} style={{ height: 35, cursor: 'context-menu' }} alt="logo" />
                    </Menu.Item> */}


                    <Menu.Item key="1">
                        <Link to="/storage">
                            <Icon type="download" theme="outlined" /> Storage
                                </Link>
                    </Menu.Item>


                    {/* {window.sessionStorage.getItem('pos_role') === 'admin' || window.sessionStorage.getItem('pos_role') === 'developer' || window.sessionStorage.getItem('pos_role') === 'staffdata'
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
                        : ''} */}
                    <SubMenu title={<span className="submenu-title-wrapper">
                        <Icon type="user" /></span>} style={{ float: 'right' }}>
                        <Menu.Item key="logout">
                            <Icon type="logout" />Logout</Menu.Item>
                    </SubMenu>





                </Menu>
                {/* </Header> */}


                <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
                    <Switch>

                        <Route path="/storage" component={StoragePage} />


                        <Redirect from='*' to='/storage' />

                    </Switch>

                </Content>
                
            </Layout>
        )
    }
}

export default Main