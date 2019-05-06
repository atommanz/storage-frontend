import React, { Component } from 'react';
import { apiFetch, exportAsExcel } from '../helpers';
import { Button, Radio, Upload, Icon, message, Row, Col, DatePicker, Card, Form, Table, Divider, Tag, Select, Spin, Input } from 'antd';
import { findIndex, uniq } from 'lodash'
import moment from 'moment'
import Cookies from 'js-cookie'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const Dragger = Upload.Dragger;

class UploadStaffData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isFileUploaded: false,
            dataSource: [],
            // dataSource: [],
            // // strQuery: `select '4000' as CompCode, dt.JrhdCode as DocNo, dt.BookDailCode as DocType, dt.JrdtRunxCode as Item,gl.AccxCode as GL, gl.AccxThaiName as GLDesc, brch.BrchCode as Branch, brch.BrchName as BranchName, dt.DebtAmnt as DrAmt, dt.CrdtAmnt as CrAmt,(select ISNULL(JrhdDate, '') AS jrhddate from dbo.GlJrHd as hd where (JrhdCode = dt.JrhdCode) and (BookDailCode = dt.BookDailCode)) as PostDate,(select JrhdDesc1 from dbo.GlJrHd as hd where (JrhdCode = dt.JrhdCode) and (BookDailCode = dt.BookDailCode)) as Text1,(select JrhdDesc2 from dbo.GlJrHd as hd where (JrhdCode = dt.JrhdCode) and (BookDailCode = dt.BookDailCode)) as Text2 from dbo.GlJrDt as dt right outer join dbo.SmProj as proj on dt.ProjCode = proj.Projcode right outer join dbo.SmDept as dept on dt.DeptCode = Dept.DeptCode right outer join dbo.SmBrch as brch on dt.BrchCode = brch.BrchCode right outer join dbo.GlChatAccx as gl on dt.AccxCode = gl.AccxCode where (gl.AccxCrtl <> '2') and JrhdDate >= fromDate and JrhdDate <= toDate order by jrhddate, dt.JrhdCode, gl.AccxCode`,
            // fromDate: '',
            // toDate: '',
            // host: '10.10.5.104',
            // dbname: 'dbindex',
            // user: 'sakrm',
            // password: 'krm@dm1n',
            // loading: false,
            // // disabledBtn: true,
            // isEdit: true
        }

        this.onUploadChange = this.onUploadChange.bind(this)
        this.onUploadRemove = this.onUploadRemove.bind(this);
    }



    onUploadChange = async (info) => {

        const status = info.file.status;
        // console.log('info.file', info.file)
        if (status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            await this.setState({ isFileUploaded: true, dataSource: info.file.response.data })

            console.log(this.state.dataSource)
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

        // console.log('data', info.file.response.data)

    }

    onUploadRemove() {
        this.setState({ isFileUploaded: false, dataSource: [] })
    }

    render() {

        const columns = [{
            title: 'ลำดับ',
            dataIndex: 'no',
        }, {
            title: 'รหัสพนักงาน',
            dataIndex: 'employeeId',
        }, {
            title: 'ชื่อ-นามสกุล',
            dataIndex: 'name',
        }, {
            title: 'ชื่อตำแหน่ง',
            dataIndex: 'position',
        }, {
            title: 'ชื่อหน่วยงาน',
            dataIndex: 'department',
        }, {
            title: 'สิทธิ์การทำงานใน POS',
            dataIndex: 'role',
        }, {
            title: 'ชื่อสถานที่ทำงาน',
            dataIndex: 'store',
        }, {
            title: 'วันที่เข้างาน',
            dataIndex: 'effectiveDate',
            render: text => (text ? moment(text).format('DD-MM-YYYY') : '')
        }, {
            title: 'หมายเหตุ',
            dataIndex: 'remark',
        }, {
            title: 'วันที่พ้นสถานะพนักงาน',
            dataIndex: 'resignationDate',
            render: text => (text ? moment(text).format('DD-MM-YYYY') : '')
        }, {
            title: 'สาขาต้นทาง',
            dataIndex: 'storeSource',
        }, {
            title: 'Request ID',
            dataIndex: 'requestId',
        }];


        return (
            <div>
                <Card title="Upload Staff Data" style={{ width: 'auto' }}>
                    <Row >
                        {/* <Dragger {...props}> */}
                        <Dragger
                            name='excelFile'
                            multiple={false}
                            action='//localhost:3001/api/upload'
                            onChange={this.onUploadChange}
                            disabled={this.state.isFileUploaded}
                            onRemove={this.onUploadRemove}
                        >

                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">คลิกหรือลากไฟล์มายังบริเวณนี้ เพื่อทำการอัพโหลด</p>
                            <p className="ant-upload-hint">สำหรับไฟล์ POS-Utils Excel version 1.01 เท่านั้น</p>
                        </Dragger>


                    </Row>

                    <Row style={{ marginTop: 20, marginLeft: 20 }}>
                        <Button
                            type="primary"
                            size="large"
                            style={{ width: 'auto' }}
                            disabled={!this.state.isFileUploaded}>
                            <Icon type="sync" /> Upload to DB
                            </Button>
                    </Row>
                    
                    {this.state.isFileUploaded?<Row style={{ marginTop: 20 }}>
                        <Table columns={columns} dataSource={this.state.dataSource} />
                    </Row>:''}
                    


                </Card>
            </div>
        );
    }





}

export default UploadStaffData;