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
            showInfoModal: false,
            showCheckoutModal: false,
            createBody: {},
            productDetail: {},
            checkoutProduct: {},
            totalPrice: ''
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

    apiCheckout() {
        apiFetch({
            url: `product/checkout`,
            method: 'PUT',
            body: this.state.checkoutProduct
        })
            .then((res) => {
                console.log(res)
                this.apiGetList()
                // this.setState({ checkoutProduct: { ...this.state.checkoutProduct, totalPrice: String(res.data) } })
                // this.setState({
                //     totalPrice: String(res.data),
                // });
                // // this.props.history.push(`/storage`)
                // this.apiGetList()
            })
    }

    apiGetPrice() {
        apiFetch({
            url: `product/price`,
            method: 'POST',
            body: this.state.checkoutProduct
        })
            .then((res) => {
                console.log(res)
                this.setState({ checkoutProduct: { ...this.state.checkoutProduct, totalPrice: String(res.data) } })
                // this.setState({
                //     totalPrice: String(res.data),
                // });
                // // this.props.history.push(`/storage`)
                // this.apiGetList()
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

    apiGetCheckoutProduct(productId) {
        apiFetch({
            url: `product/${productId}`,
            method: 'GET',
        }).then(async (res) => {
            this.setState({ checkoutProduct: res.data, showCheckoutModal: true })
            console.log('res.data', res.data)
            this.setState({ checkoutProduct: { ...this.state.checkoutProduct, _id: productId } })
            //   console.log(this.state.Datame)
        })
    }

    apiGetDetail(productId) {
        apiFetch({
            url: `product/${productId}`,
            method: 'GET',
        }).then(async (res) => {
            await this.setState({ productDetail: res.data, showInfoModal: true })
            console.log('res.data', res.data)
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

    handleInfoOk = async (e) => {
        this.setState({
            showInfoModal: false,
        });

    }

    handleInfoCancel = (e) => {
        this.setState({
            showInfoModal: false,
        });
    }

    handleCheckoutOk = async (e) => {
        await this.apiCheckout()
        this.setState({
            showCheckoutModal: false,
        });

    }

    handleCheckoutCancel = (e) => {
        this.setState({
            showCheckoutModal: false,
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
                            this.apiGetCheckoutProduct(record._id)
                        }}
                    ><Icon type="dollar" />

                    </Button>
                </span>) : (<span>
                    <Button
                        type="secondary"
                        onClick={(e) => {
                            this.props.history.push(`/storage/${record._id}`)
                            this.apiGetDetail(record._id)
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
                    title="New Product"
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
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Name* " style={{ display: 'flex' }}>
                        <Input
                            style={{ width: '90%' }}
                            value={this.state.createBody.name}
                            onChange={(e) => {
                                console.log(this.state.createBody)
                                this.setState({ createBody: { ...this.state.createBody, name: e.target.value } })
                            }}
                        />
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Descr* " style={{ display: 'flex' }}>
                        <Input
                            value={this.state.createBody.descr}
                            style={{ width: '90%' }}
                            onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, descr: e.target.value } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Start Date* " style={{ display: 'flex' }}>
                        <DatePicker
                            // value={moment(this.state.createBody.startDate)}
                            format="DD/MM/YYYY HH:mm:ss"
                            showTime
                            placeholder="Select Time"
                            onChange={(value, dateString) => { this.setState({ createBody: { ...this.state.createBody, startDate: dateString } }) }}
                        />
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Category* " style={{ display: 'flex' }}>
                        <Select value={this.state.createBody.category} style={{ width: 150 }} onChange={(e) => {
                            this.setState({ createBody: { ...this.state.createBody, category: e } })
                        }}>
                            <Option value="food">Food</Option>
                            <Option value="clothes">Clothes</Option>
                            <Option value="etc">etc</Option>
                        </Select>
                    </FormItem>

                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Width (cm.)* " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.width} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, width: String(e) } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Height (cm.)* " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.height} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, height: String(e) } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Depth (cm.)* " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.depth} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, depth: String(e) } }) }} />
                    </FormItem>
                    <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="Weight (kg.) " style={{ display: 'flex' }}>
                        <InputNumber value={this.state.createBody.weight} min={0} max={100000} step={1} style={{ width: '50%' }} onChange={(e) => { this.setState({ createBody: { ...this.state.createBody, weight: String(e) } }) }} />
                    </FormItem>

                </Modal>


                <Modal
                    title="Product Detail"
                    visible={this.state.showInfoModal}
                    onOk={this.handleInfoOk}
                    onCancel={this.handleInfoCancel}
                >
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Name " style={{ display: 'flex' }}>
                        <label>{this.state.productDetail.name}</label>
                    </FormItem>
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Start Date " style={{ display: 'flex' }}>
                        <label>{this.state.productDetail.startDate}</label>
                    </FormItem>
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="End Date " style={{ display: 'flex' }}>
                        <label>{this.state.productDetail.endDate}</label>
                    </FormItem>
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Total Price " style={{ display: 'flex' }}>
                        <label>{this.state.productDetail.totalPrice} Baht.</label>
                    </FormItem>
                </Modal>

                <Modal
                    title="Checkout Product"
                    visible={this.state.showCheckoutModal}
                    onOk={this.handleCheckoutOk}
                    onCancel={this.handleCheckoutCancel}
                    footer={[
                        <Button key="Cancel" onClick={this.handleCheckoutCancel}>Cancel</Button>,
                        <Button key="Checkout"
                            type="primary"
                            onClick={this.handleCheckoutOk}
                            disabled={(
                                !this.state.checkoutProduct.startDate
                                || !this.state.checkoutProduct.endDate
                                || !this.state.checkoutProduct._id
                                || !this.state.checkoutProduct.totalPrice
                            )}
                        >
                            Checkout
                        </Button>,
                    ]}
                >
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Name " style={{ display: 'flex' }}>
                        <label>{this.state.checkoutProduct.name} (category : {this.state.checkoutProduct.category})</label>
                    </FormItem>
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Start Date " style={{ display: 'flex' }}>
                        <label>{this.state.checkoutProduct.startDate}</label>
                    </FormItem>
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="End Date " style={{ display: 'flex' }}>
                        <DatePicker

                            format="DD/MM/YYYY HH:mm:ss"
                            showTime
                            placeholder="Select Time"
                            onChange={async (value, dateString) => {
                                await this.setState({ checkoutProduct: { ...this.state.checkoutProduct, endDate: dateString } })
                                console.log(this.state.checkoutProduct)
                                await this.apiGetPrice()
                            }}
                        />
                    </FormItem>
                    <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Total Price " style={{ display: 'flex' }}>
                        <label>{this.state.checkoutProduct.totalPrice} Baht.</label>
                    </FormItem>
                    {/* <Button onClick={(e) => {
                        this.apiGetPrice()
                    }}>aaa</Button> */}
                </Modal>
            </div >
        );
    }





}

export default UploadStaffData;