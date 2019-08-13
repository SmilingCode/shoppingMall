import React from 'react';
import PageTitle from 'component/page-title/index.js';

import { Link } from 'react-router-dom';

class PageError extends React.Component {
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="Something Wrong" />
                <div className="row">
                    <div className="col-md-12">
                        <span>Sorry, the link is not exist.</span>
                        <Link to="/">Please return to the Home page!</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageError;
