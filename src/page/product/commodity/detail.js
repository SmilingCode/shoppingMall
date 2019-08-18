import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Product from 'service/product-service.js';
const _product = new Product();

import CategorySelector from './category-selector.js';
import './index.scss';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pid: this.props.match.params.pid,
            productName: '',
            productDes: '',
            currentCategoryId: 0,   // category Id
            parentsCategoryId: 0,   // parents cateogry Id
            productPrice: '',
            stockNum: '',
            subImages: [],  // Uploaded images name
            detail: '',
            status: 1   // 0: down shelf, 1: on shelf
        }
    }
    componentDidMount() {
        this.loadProduct();
    }

    loadProduct() {
        //console.log(this.props.match.params)
        // pid exist: edit mode, pid doesn't exist: save mode
        if (this.state.pid) {
            _product.getProduct(this.state.pid).then(res => {
                let images = res.subImages.split(',');
                res.subImages = images.map(imgUri => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });

                this.setState({
                    productName: res.name,
                    productDes: res.subtitle,
                    currentCategoryId: res.categoryId,
                    productPrice: res.price,
                    stockNum: res.stock,
                    subImages: res.subImages,
                    detail: res.detail,
                    status: res.status
                });
            }, err => {
                _mm.errorInfo(err);
            })
        }
    }

    subImagesToString() {
        return this.state.subImages.map(img => img.uri).join(',');
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="Add Product" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Name</label>
                        <div className="col-sm-5">
                            <input type="text"
                                className="form-control"
                                placeholder="Please enter your product name"
                                value={this.state.productName}
                                name="productName"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Description</label>
                        <div className="col-sm-5">
                            <input type="text"
                                className="form-control"
                                placeholder="Please enter your product discription"
                                value={this.state.productDes}
                                name="productDes"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Category</label>
                        <CategorySelector
                            currentCategoryId={this.state.currentCategoryId}
                            parentsCategoryId={this.state.parentsCategoryId}
                            readOnly />
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Price</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <span className="input-group-addon">$</span>
                                    <input type="number"
                                        className="form-control"
                                        placeholder="Please enter your product price"
                                        value={this.state.productPrice}
                                        name="productPrice"
                                        readOnly
                                    />
                                <span className="input-group-addon">.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Stock Number</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number"
                                    className="form-control"
                                    placeholder="Please enter your stock number"
                                    value={this.state.stockNum}
                                    name="stockNum"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Image</label>
                        <div className="col-sm-5">
                        {
                            this.state.subImages.length ?
                            this.state.subImages.map((image, index) => {
                                return (
                                    <div key={index} className="img-uploaded">
                                        <img className="img" src={image.url} />
                                    </div>
                                )
                            }) :
                            (<div>No picture to show</div>)
                        }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Details</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.detail}}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
