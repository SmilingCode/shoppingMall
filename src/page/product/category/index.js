import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Product from 'service/product-service.js';
const _product = new Product();

import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
        //this.onUpdateName = this.onUpdateName.bind(this);
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate')
        // console.log(this.props.match.params.categoryId)
        let prevPath = prevProps.location.pathname,
        newPath = this.props.location.pathname,
        newId = this.props.match.params.categoryId || 0;

        if (prevPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }

    // when Category change the page number
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadCategoryList();
        })
    }

    loadCategoryList() {
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            //console.log(res.length)
            this.setState({
                list: res
            });
        }, err => {
            this.setState({
                list : []
            });
            _mm.errorInfo(err);
        });
    }

    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('Please input the new category name', categoryName);
        console.log(newName)
        if (newName) {
            _product.updateCategoryName({
                categoryId,
                categoryName: newName
            }).then(res => {
                _mm.errorInfo(res);
                this.loadCategoryList();
            }, err => {
                _mm.errorInfo(err);
            });
        }
    }

    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear" onClick={(e) => this.onUpdateName(category.id, category.name)}>Edit Name</a>
                        {
                            category.parentId === 0 ?
                            //<Link to=`/product-category/index/${category.id}`>Check the sub-category</Link>
                            <Link to={'/product-category/index/' + category.id}><br/>Check the sub-category</Link>
                            : null
                        }
                    </td>
                </tr>
            )
        });
        let listError = (
            <tr>
                <td colSpan="3" className="text-center">
                {
                    this.state.firstLoading ? 'Category Data Loading...' : 'There is no any relevant Category info'
                }
                </td>
            </tr>
        );
        let tableContent = this.state.list.length > 0 ? listBody : listError;
        return (
            <div id="page-wrapper">
                <PageTitle title="Category List">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>Add Category</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>Parents Category Id: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th>Category ID</th>
                                    <th>Categoryname</th>
                                    <th>Action</th>
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

export default CategoryList;
