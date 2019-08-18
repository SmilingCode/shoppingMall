import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Product from 'service/product-service.js';
const _product = new Product();

import CategorySelector from './category-selector.js';
import './index.scss';

import FileUploader from 'util/file-uploader/index.js';
import TextArea from 'util/textarea/index.js';

class ProductSave extends React.Component {
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
        this.onSaveChange = this.onSaveChange.bind(this)
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
                    status: res.status,
                    defaultDetail: res.detail
                });
            }, err => {
                _mm.errorInfo(err);
            })
        }
    }
    // select info change
    onCategoryChange(currentCategoryId, parentsCategoryId) {
        //console.log(parseInt(currentCategoryId))
        this.setState({
            currentCategoryId,
            parentsCategoryId
        })
    }
    // upload success
    onUploadSuccess(res) {
        this.state.subImages.push(res.data);
        this.setState({
            subImages: this.state.subImages
        });
    }
    // upload fail
    onUploadError(err) {
        _mm.errorInfo(err.message || 'upload image fail!');
    }
    // delete uploaded image
    onDeleteImage(e) {
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index, 1);
        this.setState({
            subImages: subImages
        })
    }
    // textarea value change
    onRichEditorValChange(value) {
        console.log(value)
        this.setState({
            detail: value
        })
    }
    // get all input value and save to State
    onSaveChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    subImagesToString() {
        return this.state.subImages.map(img => img.uri).join(',');
    }

    onSubmit(e) {
        let product = {
            productName: this.state.productName,
            productDes: this.state.productDes,
            currentCategoryId: parseInt(this.state.currentCategoryId),
            productPrice: parseFloat(this.state.productPrice),
            stockNum: parseInt(this.state.stockNum),
            subImages: this.subImagesToString(),
            detail: this.state.detail,
            status: this.state.status
        }

        if (this.state.pid) {
            product.id = this.state.pid;
        }
        // console.log(product); Validation
        let prc = _product.productResultCheck(product);
        // form validatoin true
        if (prc.status) {
            console.log(product)
            _product.addProductSubmit(product).then(res => {
                //window.location
                alert('Updated product successful!');
                this.props.history.push('/product/index');
            }, err => {
                _mm.errorInfo(err);
            })
        // form validation false
        } else {
            _mm.errorInfo(prc.msg);
        }

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
                                onChange={this.onSaveChange}
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
                                onChange={this.onSaveChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Category</label>
                        <CategorySelector
                            currentCategoryId={this.state.currentCategoryId}
                            parentsCategoryId={this.state.parentsCategoryId}
                            onCategoryChange={
                            (currentCategoryId, parentsCategoryId) => this.onCategoryChange(currentCategoryId, parentsCategoryId)
                        } />
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
                                        onChange={this.onSaveChange}
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
                                    onChange={this.onSaveChange}
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
                                        <i className="fa fa-close" index={index} onClick={(e) => this.onDeleteImage(e)}></i>
                                    </div>
                                )
                            }) :
                            (<div>Please upload your file</div>)
                        }
                        </div>
                        <div className="col-sm-10 col-md-offset-2 file-upload-btn">
                            <FileUploader onSuccess={(res) => {
                                this.onUploadSuccess(res)
                            }} onError={(err) => {
                                this.onUploadError(err)
                            }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product Details</label>
                        <div className="col-sm-5">
                            <TextArea
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onRichEditorValChange(value)}
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
        )
    }
}

export default ProductSave;
