import React from 'react';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Product from 'service/product-service.js';
const _product = new Product();

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
        this.onFirstCategoryChange = this.onFirstCategoryChange.bind(this);
        this.onSecondCategoryChange = this.onSecondCategoryChange.bind(this);
    }
    // componentDidUpdate: this one can detect if there is any change between current props and next props
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.currentCategoryId, this.props.currentCategoryId)
        //console.log(nextProps.parentsCategoryId, this.props.parentsCategoryId)

        // if the value of currentCategoryId and parentsCategoryId not change at all, no any futher action
        if (nextProps.currentCategoryId == this.props.currentCategoryId && nextProps.parentsCategoryId == this.props.parentsCategoryId) {
            return;
        }

        // check both category changed or only category1 changed
        if (nextProps.parentsCategoryId == 0) {
            //alert(nextProps.currentCategoryId)
            this.setState({
                firstCategoryId: nextProps.currentCategoryId,
                secondCategoryId: 0
            })
        } else {
            // both categories changed: 2 level select
            this.setState({
                firstCategoryId: nextProps.parentsCategoryId,
                secondCategoryId: nextProps.currentCategoryId
            }, () => {
                this.loadSecondCategory();
            })
        }
    }

    componentDidMount() {
        this.loadFirstCategory();
    }

    loadFirstCategory() {
        // dummy data(test successful: select value === option value)
        // const res = [
        //     {"id":1,"parentId":0,"name":"家用电器21","status":true,"sortOrder":null,"createTime":1490431560000,"updateTime":1490431560000},
        //     {"id":2,"parentId":0,"name":"我爱你","status":true,"sortOrder":null,"createTime":1490431581000,"updateTime":1490431581000},
        //     {"id":3,"parentId":0,"name":"丑逼","status":true,"sortOrder":null,"createTime":1490431793000,"updateTime":1490431793000},
        //     {"id":4,"parentId":0,"name":"大方","status":true,"sortOrder":null,"createTime":1490431819000,"updateTime":1490431819000}
        // ]

        // this.setState({
        //     firstCategoryList: res
        // });

        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            }, () => {
                //console.log(JSON.stringify(this.state.firstCategoryList))
            });
        }, err => {
            _mm.errorInfo(err);
        });

    }

    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            });
        }, err => {
            _mm.errorInfo(err);
        });
    }

    onFirstCategoryChange(e) {
        if (this.props.readOnly) {
            return;
        }
        let selectedFirstCName = e.target.value || 0;
        this.setState({
            firstCategoryId: selectedFirstCName,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }

    onSecondCategoryChange(e) {
        if (this.props.readOnly) {
            return;
        }
        let selectedSecondCName = e.target.value || 0;
        this.setState({
            secondCategoryId: selectedSecondCName
        }, () => {
            this.onPropsCategoryChange();
        })
    }

    onPropsCategoryChange() {
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        //console.log(categoryChangable)
        if (this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }

    render() {
        return (
            <div className="col-sm-10">
                <select className="form-control c-select"
                value={this.state.firstCategoryId}
                onChange={this.onFirstCategoryChange}
                readOnly={this.props.readOnly}
                >
                    <option value="">Please choose the category of this product</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return (
                                <option value={category.id} key={index}>{category.name}</option>
                            )
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length ?
                    (
                        <select className="form-control c-select"
                        value={this.state.secondCategoryId}
                        onChange={this.onSecondCategoryChange}
                        readOnly={this.props.readOnly}
                        >
                            <option value="">Please choose the sub-category of this product</option>
                            {
                                this.state.secondCategoryList.map((category, index) => {
                                    return (
                                        <option value={category.id} key={index}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
                    )
                    : null
                }
            </div>
        )
    }
}

export default CategorySelector;
