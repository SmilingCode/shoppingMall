import React from 'react';
import PageTitle from '../../component/page-title/index.js';

class Home extends React.Component {
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="Home">
                    <div className="row">
                        <div className="col-md-12">
                            body
                        </div>
                    </div>
                </PageTitle>

            </div>
        );
    }
}

export default Home;
