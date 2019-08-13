import React from 'react';
import PageTitle from '../../component/page-title/index.js';

import { Link } from 'react-router-dom';
import './index.scss';

import Mutil from 'util/mm.js';
const _mm = new Mutil();

import Stat from 'service/stat-service.js';
const _stat = new Stat();

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userCount: '',
            productCount: '',
            orderCount: ''
        }
    }

    componentDidMount() {
        this.loadCountingService();
    }

    loadCountingService() {
        _stat.getHomeCount().then((res) => {
            //console.log(res);
            this.setState(res);
            // this.setState({
            //     userCount: res.userCount,
            //     productCount: res.productCount,
            //     orderCount: res.orderCount
            // });
        }, (err) => {
            //console.log(err)
            _mm.errorInfo(err);
        });
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="Home">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/user" className="color-box brown">
                                <p className="count">{this.state.userCount}</p>
                                <p className="desc">
                                    <i className="fa fa-user-o"></i>
                                    <span>User Total Number</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/product" className="color-box green">
                                <p className="count">{this.state.productCount}</p>
                                <p className="desc">
                                    <i className="fa fa-list"></i>
                                    <span>Product Total Number</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/order" className="color-box blue">
                                <p className="count">{this.state.orderCount}</p>
                                <p className="desc">
                                    <i className="fa fa-check-square-o"></i>
                                    <span>Order Total Number</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                </PageTitle>

            </div>
        );
    }
}

export default Home;
