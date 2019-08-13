import React from 'react';
import { Link } from 'react-router-dom';

import Mutil from 'util/mm.js';
const _mm = new Mutil();

import User from 'service/user-service.js';
const _user = new User();

class TopNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: _mm.getStorage('userInfo').username || 'Guest1'
        }
    }

    // logout
    onLogout() {
        _user.logOut().then(res => {
            _mm.removeStorage('userInfo');
            //this.props.history.push('/login');
            window.location.href = '/login';
        }, err => {
            _mm.errorInfo(err);
        })
    }

    render() {
        return (
            <div>
                <div className="navbar navbar-default top-navbar" role="navigation">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link className="navbar-brand" to="/"><b>Shopping</b>Mall</Link>
                    </div>

                    <ul className="nav navbar-top-links navbar-right">
                        <li className="dropdown">
                            <a className="dropdown-toggle" href="javascript:;" aria-expanded="false">
                                <i className="fa fa-user fa-fw"></i>

                                <span> Welcome {this.state.username} </span>
                                <i className="fa fa-caret-down"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-user">
                                <li>
                                    <a href="javascript:;" onClick={() => {this.onLogout()}}>
                                        <i className="fa fa-sign-out fa-fw"></i> Logout
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default TopNav;
