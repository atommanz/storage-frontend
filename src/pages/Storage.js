import React, { Component } from 'react';
import { apiFetch, exportAsExcel } from '../helpers';
import { Button, Modal, Upload, Icon, InputNumber, Row, Col, DatePicker, Card, Form, Table, Divider, Tag, Select, Spin, Input } from 'antd';
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
            filterCategory: '',
            filterStatus: '',
            showCreateModal: false,
            createBody: {}
        }

        // this.onUploadChange = this.onUploadChange.bind(this)
        // this.onUploadRemove = this.onUploadRemove.bind(this);
    }


    componentWillMount() {
        this.apiGetList()
        this.setState({ createBody: { ...this.state.createBody, category: 'food' } })
    }

    apiCreateProduct() {
        apiFetch({
            url: `product`,
            method: 'POST',
            body: this.state.createBody
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    showCreateModal: false,
                });
                // this.props.history.push(`/storage`)
                this.apiGetList()
            })
    }

    apiGetList() {
        apiFetch({
            url: 'product',
            method: 'GET',
            query: {
                category: this.state.filterCategory,
                status: this.state.filterStatus
            },
        }).then((res) => {
            this.setState({ listData: res.data })
            console.log('listData', this.state.listData)
            //   console.log(this.state.Datame)
        })
    }

    apiGetDetail(productId) {
        apiFetch({
            url: `product/${productId}`,
            method: 'GET',
            // query: {
            //     category: this.state.filterCategory,
            //     status: this.state.filterStatus
            // },
        }).then((res) => {
            this.setState({ listData: res.data })
            console.log('listData', this.state.listData)
            //   console.log(this.state.Datame)
        })
    }

    selectCategoryChange = async (value) => {
        await this.setState({ filterCategory: value })
        await this.apiGetList()
    }
    selectStatusChange = async (value) => {
        await this.setState({ filterStatus: value })
        await this.apiGetList()
    }

    showCreateModal = () => {
        this.setState({
            showCreateModal: true,
        });
    }

    handleCreateOk = async (e) => {
        console.log(e);
        const idProduct = await this.apiCreateProduct()
        console.log(`create id : ${idProduct}`)
        this.setState({
            showCreateModal: false,
        });

    }

    handleCreateCancel = (e) => {
        console.log(e);
        this.setState({
            showCreateModal: false,
            createBody: {}
        });
    }

    infoModal(productId) {
        Modal.info({
          title: 'Product Detail',
          content: (
            <div>
              <p>some messages...some messages...</p>
              <p>some messages...some messages...</p>
            </div>
          ),
          onOk() {},
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
            render: text => (text === 'A' ? 'Active' : 'Inactive')
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (record.status === 'A' ?
                (<span>
                    <Button
                        type="primary"
                        onClick={(e) => {
                            this.props.history.push(`/storage/${record._id}`)
                        }}
                    ><Icon type="dollar" />

                    </Button>
                </span>) : (<span>
                    <Button
                        type="secondary"
                        onClick={(e) => {
                            this.props.history.push(`/storage/${record._id}`)
                            this.infoModal(record._id)
                        }}
                    >
                       <Icon type="search" />
                    </Button>
                </span>)
            ),
        }
        ];

        return (
            <div>
                <Card
                    title="Storage"
                    extra={<Button type="primary" onClick={(e) => { this.showCreateModal() }}><Icon type="plus-circle" />Add</Button>}
                    style={{ width: 'auto' }}>
                    <Row>
                        <Col span={12} >
                            Category : <Select defaultValue="" style={{ width: 150 }} onChange={(e) => { this.selectCategoryChange(e) }}>
                                <Option value="">Please select</Option>
                                <Option value="food">Food</Option>
                                <Option value="clothes">Clothes</Option>
                                <Option value="etc">etc</Option>
                            </Select>
                        </Col>
                        <Col span={12} >
                            Status : <Select defaultValue="" style={{ width: 150 }} onChange={(e) => { this.selectStatusChange(e) }}>
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
                    okButtonProps={{
                        disabled: (
                            !this.state.createBody.name
                            || !this.state.createBody.descr
                            || !this.state.createBody.startDate
                            || !this.state.createBody.category
                            || !this.state.createBody.width
                            || !this.state.createBody.height
                            || !this.state.createBody.depth
                        )
                    }}
                >
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Name* " style={{ display: 'flex' }}>
                        <Input
                            style={{ width: '90%' }}
                            value={this.state.createBody.name}
                            onChange={(e) => {
                                console.log(this.state.createBody)
                                this.setState({ createBody: { ...this.state.createBody, name: e.target.value } })
                            }}
                        />
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Descr* " style={{ display: 'flex' }}>
                        <Input
                            value={this.state.createBody.descr}
                            style={{ width: '90%' }}
                            onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, descr: e.target.value } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Start Date* " style={{ display: 'flex' }}>
                        <DatePicker
                            // value={moment(this.state.createBody.startDate)}
                            format="DD/MM/YYYY HH:mm:ss"
                            showTime
                            placeholder="Select Time"
                            onChange={(value, dateString) => { this.setState({ createBody: { ...this.state.createBody, startDate: dateString } }) }}
                        />
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Category* " style={{ display: 'flex' }}>
                        <Select value={this.state.createBody.category} style={{ width: 150 }} onChange={(e) => {
                            this.setState({ createBody: { ...this.state.createBody, category: e } })
                        }}>
                            <Option value="food">Food</Option>
                            <Option value="clothes">Clothes</Option>
                            <Option value="etc">etc</Option>
                        </Select>
                    </FormItem>

                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Width* " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.width} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, width: String(e) } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Height* " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.height} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, height: String(e) } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Depth* " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.depth} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, depth: String(e) } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} label="Weight " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.weight} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, weight: String(e) } }) }} />
                    </FormItem>

                </Modal>
            </div >
        );
    }





}

export default UploadStaffData;