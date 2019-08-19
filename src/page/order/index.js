import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Order from 'service/order-service.js';
const _order = new Order();

import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

import ListSearch from './index-list-search.js';

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            firstLoading: true,
            listType: 'list'    // list, search
        }

        //this.onProductStatusChange = this.onProductStatusChange.bind(this);
    }

    componentDidMount() {
        this.loadOrderList();
    }
    // when user change the page number
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList();
        });
    }
    // click search button
    onSearch(orderNumber) {
        //console.log(searchType, searchKeyword)
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType,
            pageNum: 1,
            orderNumber
        }, () => {
            this.loadOrderList();
        });
    }
    // load product list
    loadOrderList() {
        let listParam = {
            listType: this.state.listType,
            pageNum: this.state.pageNum
        };
        // let listParam = {};
        // listParam.listType = this.state.listType;
        // listParam.pageNum = this.state.pageNum;

        // add 2 fields name to search mode
        if (this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNumber;
        }
        // product list request
        _order.getOrderList(listParam).then(res => {
            this.setState(res, () => {
                this.setState({
                    firstLoading: false
                });
            });
        }, err => {
            this.setState({
                list: []
            });
            _mm.errorInfo(err);
        });
    }
    // click to change status
    onProductStatusChange(productId, crtStatus) {
        let newStatus = crtStatus == 1 ? 2 : 1,
            confirmInfo = crtStatus == 1
            ? 'Are you sure to switch this item online?'
            : 'Are you sure to switch this item offline?';
        //console.log(productId, crtStatus)
        if (window.confirm(confirmInfo)) {
            _product.changeProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.errorInfo(res);
                this.loadOrderList();
            }, err => {
                _mm.errorInfo(err);
            })
        }
    }

    render() {
        // table of products
        let listBody = this.state.list.map((order, index) => {
            return (
                <tr key={index}>
                    <td>
                        <Link className="action" to={'/order/detail/' + order.orderNo}>{order.orderNo}</Link>
                    </td>
                    <td>{order.receiverName}</td>
                    <td>{order.statusDesc}</td>
                    <td>{order.payment}</td>
                    <td>{order.createTime}</td>
                    <td>
                        <Link className="action" to={'/order/detail/' + order.orderNo}>Details</Link>
                    </td>
                </tr>
            )
        });
        // error info(loading or fail)
        let listError = (
            <tr>
                <td colSpan="6" className="text-center">
                {
                    this.state.firstLoading ? 'Product Data Loading...' : 'There is no any relevant product info'
                }
                </td>
            </tr>
        );
        // list or error show on the page
        let tableContent = this.state.list.length > 0 ? listBody : listError;

        return (
            <div id="page-wrapper">
                <PageTitle title="Order List" />
                <div className="row search-wrapper">
                    <ListSearch onSearch={(orderNumber) => {this.onSearch(orderNumber)}} />
                    <div className="col-md-12">
                        <table className="table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th width="10%">Order ID</th>
                                    <th width="50%">Recipients</th>
                                    <th width="10%">Order Status</th>
                                    <th width="15%">Order Price</th>
                                    <th width="15%">Created Time</th>
                                    <th width="15%">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent}
                            </tbody>
                        </table>
                        <Pagination
                            current={this.state.pageNum}
                            total={this.state.total}
                            hideOnSinglePage
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderList;
