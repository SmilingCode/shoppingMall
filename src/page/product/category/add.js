import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Product from 'service/product-service.js';
const _product = new Product();

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
        this.onValueChange = this.onValueChange.bind(this)
    }

    componentDidMount() {
        this.loadCategoryList();
    }
    // show parent category list
    loadCategoryList() {
        _product.getCategoryList().then(res => {
            //console.log(res.length)
            this.setState({
                categoryList: res
            });
        }, err => {
            _mm.errorInfo(err);
        });
    }

    onValueChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit(e) {

        if (this.state.categoryName) {
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: this.state.categoryName
            }).then(res => {
                _mm.errorInfo(res);
                this.props.history.push('/product-category/index');
            }, err => {
                _mm.errorInfo(err);
            });
        } else {
            _mm.errorInfo('Please input the category name!');
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="Category List" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Category</label>
                            <div className="col-sm-5">
                                <select
                                    name="parentId"
                                    className="form-control"
                                    onChange={this.onValueChange}>
                                    <option value="0">root/</option>
                                    {
                                        this.state.categoryList.map((category, index) => {
                                            return (
                                                <option value={category.id} key={index}>
                                                    root/{category.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-sm-2 control-label">Category Name</label>
                            <div className="col-sm-5">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Please input the product name"
                                    name="categoryName"
                                    value={this.state.productName}
                                    onChange={this.onValueChange}
                                    />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                            <button onClick={e => this.onSubmit(e)} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCategory;
