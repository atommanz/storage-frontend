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
                <div className="logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    onClick={this.handleClick}
                >

                    <Menu.Item key="1">
                        <Link to="/storage">
                            <Icon type="download" theme="outlined" /> Storage
                                </Link>
                    </Menu.Item>


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