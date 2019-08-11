import React from 'react';
import TopNav from '../top-nav/index.js';
import SideNav from '../side-nav/index.js';
import './theme.css';

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div id="wrapper">

                <TopNav />
                <SideNav />

                {this.props.children}
            </div>
        );
    }
}

export default Layout;
