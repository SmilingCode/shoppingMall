import React from 'react';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // logout
    onLogout() {

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
                                <span> Welcome Admin xxx </span>
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
