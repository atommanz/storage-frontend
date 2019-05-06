import React, { Component } from 'react';
import { apiFetch, exportAsExcel } from '../helpers';
import { Button, Modal, Upload, Icon, message, Row, Col, DatePicker, Card, Form, Table, Divider, Tag, Select, Spin, Input } from 'antd';
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
            listData: [],
            filterCategory :'',
            filterStatus :'',
            showCreateModal : false
        }

        // this.onUploadChange = this.onUploadChange.bind(this)
        // this.onUploadRemove = this.onUploadRemove.bind(this);
    }

    
    componentWillMount() {
        this.apiGetList()
    }


    apiGetList() {
        apiFetch({ 
            url: 'product', 
            method: 'GET' ,
            query: { 
                category: this.state.filterCategory,
                status :  this.state.filterStatus
             },
        }).then((res) => {
            this.setState({ listData: res.data })
            console.log('listData', this.state.listData)
            //   console.log(this.state.Datame)
        })
    }
    selectCategoryChange = async(value)=> {
       await this.setState({filterCategory:value})
       await this.apiGetList()
      }
    selectStatusChange = async(value)=> {
        await this.setState({filterStatus:value})
        await this.apiGetList()
       }

       showCreateModal = () => {
        this.setState({
          showCreateModal: true,
        });
      }
    
      handleCreateOk = (e) => {
        console.log(e);
        this.setState({
            showCreateModal: false,
        });
      }
    
      handleCreateCancel = (e) => {
        console.log(e);
        this.setState({
            showCreateModal: false,
        });
      }
    render() {

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, {
            title: 'Category',
            dataIndex: 'category',
        }, {
            title: 'width',
            dataIndex: 'width',
        }, {
            title: 'height',
            dataIndex: 'height',
        }, {
            title: 'depth',
            dataIndex: 'depth',
        }, {
            title: 'weight',
            dataIndex: 'weight',
        }, {
            title: 'Start Date',
            dataIndex: 'startDate',
        }, {
            title: 'End Date',
            dataIndex: 'endDate',
        }, {
            title: 'Total Price',
            dataIndex: 'totalPrice',
        }, {
            title: 'Status',
            dataIndex: 'status',
            render: text => (text === 'A'? 'Active' : 'Inactive')
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button
                        type="primary"
                        onClick={(e) => {
                            this.props.history.push(`/storage/${record._id}`)
                        }}
                    ><Icon type="dollar" />

                    </Button>
                </span>
            ),
        }
        ];

        return (
            <div>
                <Card
                 title="Storage" 
                 extra={<Button type="primary" onClick={(e)=>{this.showCreateModal()}}><Icon type="plus-circle" />Add</Button>}
                style={{ width: 'auto' }}>
                <Row>
                <Col span={12} >
                     Category : <Select defaultValue="" style={{ width: 150 }} onChange={(e)=>{this.selectCategoryChange(e)}}>
                     <Option value="">Please select</Option>
                    <Option value="food">Food</Option>
                    <Option value="clothes">Clothes</Option>
                    <Option value="etc">etc</Option>
                    </Select>
                     </Col>
                     <Col span={12} >
                     Status : <Select defaultValue="" style={{ width: 150 }} onChange={(e)=>{this.selectStatusChange(e)}}>
                     <Option value="">Please select</Option>
                    <Option value="A">Active</Option>
                    <Option value="I">Inactive</Option>
                    </Select>
                     </Col>
                    </Row>
                  
                    
                        <Table columns={columns} dataSource={this.state.listData} style={{ marginTop: 30 }} />


                </Card>
                <Modal
                    title="Basic Modal"
                    visible={this.state.showCreateModal}
                    onOk={this.handleCreateOk}
                    onCancel={this.handleCreateCancel}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    </Modal>
            </div>
        );
    }





}

export default UploadStaffData;