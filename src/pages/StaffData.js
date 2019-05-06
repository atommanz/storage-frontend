import React, { Component } from 'react';
import { apiFetch, exportAsExcel } from '../helpers';
import { Button, Tag, Upload, Icon, message, Row, Col, DatePicker, Card, Form, Modal, Select, Spin, Input } from 'antd';
import { findIndex, uniq } from 'lodash'
import moment from 'moment'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import staffAction from '../actions/staff'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Dragger = Upload.Dragger;
const confirm = Modal.confirm;

class StaffData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            store: '',
            username: '',
            infoStaff: ''

        }

    }



    handleSelectChange(value) {
        console.log(`selected ${value}`)
        this.setState({ store: value, infoStaff: '' })
    }

    apiGetStaff(store, username) {
        apiFetch({ url: `staffData`, method: 'GET', query: { store, username } }).then((res) => {
            if (res.data[0]) {
                // message.success(`ค้นหาสำเร็จ`)
                this.setState({ infoStaff: res.data[0] })
                console.log(this.state.infoStaff)
                this.props.getStaff(res.data[0])
                console.log('staff prop', this.props.staff)
            }
            else {
                message.error(`ไม่พบข้อมูล`)
                this.setState({ infoStaff: '' })
                console.log(this.state.infoStaff)
            }

        })
    }

    apiResetPassword(store, username) {
        // console.log('reset',store, username)
        apiFetch({ url: `staffData/reset-password`, method: 'POST', body: { store, username, createdBy: Cookies.get('pos-token') } }).then((res) => {
            if (res.success === true) {
                message.success(`Reset Password สำเร็จ`)
                this.apiGetStaff(store, username)
            }
            else {
                message.error(`Reset Password ไม่สำเร็จ`)
                this.apiGetStaff(store, username)
            }

        })
    }

    apiUnlock(store, username) {
        // console.log('reset',store, username)
        apiFetch({ url: `staffData/unlock`, method: 'POST', body: { store, username, createdBy: Cookies.get('pos-token') } }).then((res) => {
            if (res.success === true) {
                message.success(`Unlock สำเร็จ`)
                this.apiGetStaff(store, username)
            }
            else {
                message.error(`Unlock ไม่สำเร็จ`)
                this.apiGetStaff(store, username)
            }

        })
    }

    showDeleteConfirm(store, username) {
        const thisClass = this
        confirm({
            title: 'Reset Password?',
            content: 'ยืนยันเพื่อเปลี่ยนรหัสผ่าน',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                thisClass.apiResetPassword(store, username)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    modalUnlock(store, username) {
        const thisClass = this
        confirm({
            title: 'Unlock user?',
            content: 'ยืนยันเพื่อปลดล็อค',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                thisClass.apiUnlock(store, username)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    statusTag(statusData, passwordExpDate) {
        // const thisClass = this
        if (statusData === 'ACTIVE') {
            if (!moment(passwordExpDate).isBefore(moment().format())) {
                return <Tag color="#87d068">{this.state.infoStaff['User Status']}</Tag>
            }
            else if (moment(passwordExpDate).isBefore(moment().format())) {
                return <Tag color="#F4D03F">{this.state.infoStaff['User Status']} - Password Expire</Tag>
            }
        }
        else {
            return <Tag color="#f50">{this.state.infoStaff['User Status']}</Tag>
        }
        // if (inp === 'INACTIVE')
    }


    render() {
        return (
            <div>
                <Card title="Staff Data" style={{ width: 'auto' }}>
                    <Row >
                        <Col span={10} style={{ textAlign: 'left' }}> สาขา : <Select
                            // defaultValue = '1222'
                            showSearch
                            placeholder="เลือกสาขา"
                            style={{ width: 300 }}
                            onChange={(e) => { this.handleSelectChange(e) }}>
                            {/* <Option value="0000" selected>เลือกสาขา</Option> */}
                            <Option value="dev">dev</Option>
                            <Option value="1000">ILM Event</Option>
                            <Option value="1407">1407-FC แฟชั่นฯรามอินทรา</Option>
                            <Option value="1440">1440-FC ท่าอากาศยานดอนเมือง</Option>
                            <Option value="1202">1202-ILM รัตนาธิเบศร์</Option>
                            <Option value="1203">1203-ILM รังสิต</Option>
                            <Option value="1206">1206-ILM ภูเก็ต</Option>
                            <Option value="1207">1207-ILM หัวหิน</Option>
                            <Option value="1208">1208-ILM เอกมัย</Option>
                            <Option value="1210">1210-ILM บางใหญ่</Option>
                            <Option value="1211">1211-ILM อุบลราชธานี</Option>
                            <Option value="1213">1213-ILM เชียงใหม่</Option>
                            <Option value="1214">1214-ILM พิษณุโลก</Option>
                            <Option value="1215">1215-ILM อุดรธานี</Option>
                            <Option value="1216">1216-ILM ขอนแก่น</Option>
                            <Option value="1217">1217-ILM ชลบุรี</Option>
                            <Option value="1219">1219-ILM จอหอ นครราชสีมา</Option>
                            <Option value="1221">1221-ILM บางนา</Option>
                            <Option value="1222">1222-ILM พระราม 2</Option>
                            <Option value="1223">1223-ILM ราชพฤกษ์</Option>
                            <Option value="1224">1224-ILM เกษตรนวมินทร์</Option>
                            <Option value="1225">1225-ILM พัทยา2</Option>
                            <Option value="1227">1227-ILM นครสวรรค์</Option>
                            <Option value="1229">1229-ILM มหาชัย</Option>
                            <Option value="1230">1230-ILM หาดใหญ่</Option>
                            <Option value="1231">1231-ILM สุราษฎร์ธานี</Option>
                            <Option value="1232">1232-ILM ระยอง</Option>
                            <Option value="1234">1234-ILM นครศรีธรรมราช</Option>
                            <Option value="1235">1235-ILM แจ้งวัฒนะ</Option>
                            <Option value="1236">1236-ILM นครปฐม</Option>
                            <Option value="1238">1238-ILM ฉะเชิงเทรา</Option>
                            <Option value="1242">1242-ILM สุรินทร์</Option>
                            <Option value="1246">1246-ILM บางกรวย-ไทรน้อย</Option>
                            <Option value="1248">1248-ILM ชัยพฤกษ์</Option>
                        </Select></Col>
                        <Col span={10} style={{ textAlign: 'left' }}> Username : <Input placeholder="6240065"
                            onChange={(e) => {
                                this.setState({ username: e.target.value, infoStaff: '' })

                            }}
                            style={{ width: 200 }} /></Col>

                        <Col span={4} style={{ textAlign: 'center' }}><Button

                            type="secoundary"
                            icon="search"
                            disabled={(this.state.username && this.state.store && this.state.store !== '0000' ? false : true)}
                            onClick={(e) => {
                                this.apiGetStaff(this.state.store, this.state.username)

                            }}

                            style={{ width: '150px' }}

                        >ค้นหา</Button></Col>

                    </Row>
                    {(this.state.infoStaff ?

                        <Row style={{ marginTop: 30, marginLeft: 50 }}>
                            <Col span={12} >
                                <Row style={{ marginTop: 20 }}><b>lEmployeeID :</b> {this.state.infoStaff['lEmployeeID']}</Row>
                                <Row style={{ marginTop: 20 }}><b>User ID  :</b> {this.state.infoStaff['User ID']}</Row>
                                <Row style={{ marginTop: 20 }}><b>Profile Name :</b> {this.state.infoStaff['Profile Name']}</Row>
                                <Row style={{ marginTop: 20 }}><b>Effective Date :</b> {
                                    moment(this.state.infoStaff['Effective Date']).format('DD-MM-YYYY')
                                }</Row>
                                <Row style={{ marginTop: 20 }}><b>Last Active Date-Time :</b> {
                                    moment(this.state.infoStaff['Last Active Date-Time'], "YYYYMMDDHHmmss").format('DD-MM-YYYY HH:mm:ss')
                                }</Row>
                                <Row style={{ marginTop: 20 }}><b>Password Effective Date :</b> {
                                    moment(this.state.infoStaff['Password Effective Date']).format('DD-MM-YYYY')
                                }</Row>

                                {/* <Row style={{ marginTop: 20 }}><b>Expiration Date  :</b> {this.state.infoStaff['Expiration Date']}</Row> */}
                                <Row style={{ marginTop: 20 }}><b>Force Password Change  :</b> {(this.state.infoStaff['Force Password Change'] === 'Yes' ? <Tag color="#f50">{this.state.infoStaff['Force Password Change']}</Tag> : <Tag color="#87d068">{this.state.infoStaff['Force Password Change']}</Tag>)}</Row>
                                <Row style={{ marginTop: 20 }}>
                                    <Button
                                        type="danger"
                                        size="large"
                                        style={{ width: '200px' }}
                                        onClick={(e) => { this.modalUnlock(this.state.store, this.state.username) }}
                                    >Unlock
                                </Button></Row>
                            </Col>
                            <Col span={12}>
                                <Row style={{ marginTop: 20 }}><b>szEmplName :</b> {this.state.infoStaff['szEmplName']}</Row>

                                <Row style={{ marginTop: 20 }}><b>User Status :</b> {this.statusTag(this.state.infoStaff['User Status'], this.state.infoStaff['Password Expire Date'])}
                                    {/* {(this.state.infoStaff['User Status'] === 'ACTIVE' ? 
                                <Tag color="#87d068">{this.state.infoStaff['User Status']}</Tag> : <Tag color="#f50">{this.state.infoStaff['User Status']}</Tag>)} */}

                                </Row>
                                <Row style={{ marginTop: 20 }}><b>Profile Description :</b> {this.state.infoStaff['Profile Description']}</Row>
                                <Row style={{ marginTop: 20 }}><b>Expiration Date  :</b> {this.state.infoStaff['Expiration Date']}</Row>
                                {/* <Row style={{ marginTop: 20 }}><b>Password Expire Days :</b> {this.state.infoStaff['Password Expire Days']}</Row> */}
                                <Row style={{ marginTop: 20 }}><b>Wrong Password Count :</b> {this.state.infoStaff['Wrong Password Count']}</Row>
                                <Row style={{ marginTop: 20 }}><b>Password Expire Date :</b> {moment(this.state.infoStaff['Password Expire Date']).format('DD-MM-YYYY')}</Row>
                                {/* <Row style={{ marginTop: 20 }}><b>Effective Date :</b> {

                                    moment(this.state.infoStaff['Effective Date']).format('DD-MM-YYYY')
                                }</Row> */}
                                {/* <Row style={{ marginTop: 20 }}><b>Comment :</b> {this.state.infoStaff['Comment']}</Row> */}
                                <Row style={{ marginTop: 20 }}><b>Password Expire Days :</b> {this.state.infoStaff['Password Expire Days']}</Row>
                                <Row style={{ marginTop: 20 }}>
                                    <Button
                                        type="danger"
                                        size="large"
                                        style={{ width: '200px' }}
                                        onClick={(e) => { this.showDeleteConfirm(this.state.store, this.state.username) }}
                                    >Reset Password
                                </Button></Row>
                            </Col>
                        </Row>
                        : <Row></Row>)}



                </Card>
            </div>
        );
    }





}

function mapStateToProps(state) {
    return {
        staff: state.staff

    }
}
// export default StaffData;
export default connect(mapStateToProps, staffAction)(StaffData)