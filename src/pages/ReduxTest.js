import React, { Component } from 'react';
import { apiFetch, exportAsExcel } from '../helpers';
import { Button, Radio, Upload, Icon, message, Row, Col, DatePicker, Card, Form, Table, Divider, Tag, Select, Spin, Input } from 'antd';
import { findIndex, uniq } from 'lodash'
import moment from 'moment'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import ageAction from '../actions/reduxTest'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

class ReduxTest extends Component {
    render() {
        return (
            <div>

                <Card title="ReduxTest" style={{ width: 'auto' }}>

                    <h3>อายุของคุณ : {this.props.age} ปี</h3>
                    <h3>PlusTen : {this.props.tenStore} N/A</h3>
                    <h3>Name Staff Store : {this.props.staff.szEmplName}</h3>
                    <button onClick={this.props.increteAge}>+คลิกบวกอายุ</button>
                    <button onClick={this.props.decreteAge}>-คลิกลบอายุ</button>
                    <button onClick={this.props.plus10}>-คลิกลบอายุ</button>
                    <button onClick={this.props.not}>-คลิกลบอายุ</button>

                </Card>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        age: state.counter,
        tenStore : state.plus,
        staff: state.staff
        
    }
}
export default connect(mapStateToProps, ageAction)(ReduxTest)