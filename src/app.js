import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from './page/home/index.js';
import Layout from './component/layout/index.js';

class App extends React.Component {

    render() {
        return (
            <Router>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/product" component={Home} />
                        <Route path="/product-categories" component={Home} />
                        <Route path="/order" component={Home} />
                        <Route path="/user" component={Home} />
                    </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
