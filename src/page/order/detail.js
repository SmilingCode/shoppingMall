import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import Order from 'service/order-service.js';
const _order = new Order();

class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo: {}
        }
        this.onDelivery = this.onDelivery.bind(this);
    }
    componentDidMount() {
        this.loadOrder();
    }

    loadOrder() {
        //console.log(this.props.match.params)
        // pid exist: edit mode, pid doesn't exist: save mode
        _order.getOrderDetial(this.state.orderNumber).then(res => {
            this.setState({
                orderInfo: res
            });
        }, err => {
            _mm.errorInfo(err);
        });
    }

    onDelivery() {
        if (window.confirm('whether delivery the order to customer now?')) {
            _order.sendGoods(this.state.orderNumber).then(res => {
                this.errorInfo('Delivery goods to customer now!');
            }, err => {
                this.errorInfo('Delivery failed!');
            })
        }
    }

    render() {
        let receiverInfo = this.state.orderInfo.shippingVo || {},
            orderItemList = this.state.orderInfo.orderItemVoList || [];

        let listBody = orderItemList.map((product, index) => {
            return (
                <tr key={index}>
                    <td>
                        <img className="p-img"
                            src={`${this.state.orderInfo.imageHost}${product.productImage}`}
                            alt={product.productName}
                        />
                    </td>
                    <td>{product.productName}</td>
                    <td>{product.currentUnitPrice}</td>
                    <td>{product.quantity}</td>
                    <td>{product.totalPrice}</td>
                </tr>
            )
        });

        return (
            <div id="page-wrapper">
                <PageTitle title="Add Order" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Order Number</label>
                        <div className="col-sm-5">
                            <p>{this.state.orderInfo.orderNo}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Order Created Time</label>
                        <div className="col-sm-5">
                            <p>{this.state.orderInfo.createTime}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Recipients</label>
                        <div className="col-sm-5">
                            {`${receiverInfo.receiverName || ''}, ${receiverInfo.receiverProvince || ''}, ${receiverInfo.receiverCity || ''}, ${receiverInfo.receiverAddress || ''}, ${receiverInfo.receiverMobile || ''}`}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Order Status</label>
                        <div className="col-sm-5">
                            {this.state.orderInfo.statusDesc}
                            {
                                this.state.orderInfo.status === 20
                                ? <button className="btn btn-primary btn-sm" onClick={this.onDelivery}>Delivery Product Now</button>
                                : null
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Payment</label>
                        <div className="col-sm-5">
                            {this.state.orderInfo.paymentTypeDesc}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Order Price</label>
                        <div className="col-sm-5">
                            {this.state.orderInfo.payment}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">Product List</label>
                        <div className="col-sm-10">
                            <table className="table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th>Product Picture</th>
                                    <th>Product Info</th>
                                    <th>Product Price</th>
                                    <th>Product quantity</th>
                                    <th>Product Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBody}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail;
