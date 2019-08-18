import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Product from 'service/product-service.js';
const _product = new Product();

import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

import ListSearch from './index-list-search.js';

import './index.scss';

class ProductList extends React.Component {
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
        this.loadProductList();
    }
    // when user change the page number
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList();
        })
    }
    // click search button
    onSearch(searchType, searchKeyword) {
        //console.log(searchType, searchKeyword)
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType,
            pageNum: 1,
            searchType,
            searchKeyword
        }, () => {
            this.loadProductList();
        })
    }
    // load product list
    loadProductList() {
        let listParam = {
            listType: this.state.listType,
            pageNum: this.state.pageNum
        };
        // let listParam = {};
        // listParam.listType = this.state.listType;
        // listParam.pageNum = this.state.pageNum;

        // add 2 fields name to search mode
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }
        // product list request
        _product.getProductList(listParam).then(res => {
            this.setState(res, () => {
                this.setState({
                    firstLoading: false
                });
            });
        }, err => {
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
                this.loadProductList();
            }, err => {
                _mm.errorInfo(err);
            })
        }
    }

    render() {
        // table of products
        let listBody = this.state.list.map((product, index) => {
            return (
                <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                        <p>{product.name}</p>
                        <p>{product.subtitle}</p>
                    </td>
                    <td>{product.price}</td>
                    <td>
                        <p>{product.status == 1 ? 'Selling' : 'Off-Shore'}</p>
                        <button className="btn btn-xs btn-warning"
                            onClick={() => this.onProductStatusChange(product.id, product.status)}>
                            {
                                product.status == 1 ? 'Off-Shore' : 'Selling'
                            }
                        </button>
                    </td>
                    <td>
                        <Link className="action" to={'/product/detail/' + product.id}>Details</Link>
                        <Link className="action" to={`/product/save/${product.id}`}>Edit</Link>
                    </td>
                </tr>
            )
        });
        // error info(loading or fail)
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
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
                <PageTitle title="Product List">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>Add Products</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row search-wrapper">
                    <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}} />
                    <div className="col-md-12">
                        <table className="table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th width="10%">Product ID</th>
                                    <th width="50%">Product Info</th>
                                    <th width="10%">Price</th>
                                    <th width="15%">Status</th>
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

export default ProductList;
