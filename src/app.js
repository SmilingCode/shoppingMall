import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import Home from './page/home/index.js';
import Layout from './component/layout/index.js';
import Login from './page/login/index.js';

import PageError from 'page/error/index.js';
import UserList from 'page/user/index.js';

class App extends React.Component {

    render() {
        return (

            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/product" component={Home} />
                            <Route path="/product-categories" component={Home} />
                            <Route path="/order" component={Home} />
                            <Route path="/user" component={UserList} />
                            <Route component={PageError} />
                        </Switch>
                    </Layout>
                </Switch>
            </Router>
            /*
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" render={ props => (
                        <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/product" component={Home} />
                            <Route path="/product-categories" component={Home} />
                            <Route path="/order" component={Home} />
                            <Route path="/user" component={UserList} />
                            <Route component={PageError} />
                        </Switch>
                    </Layout>
                        )
                    } />
                </Switch>
            </Router>
            */
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
