import React from 'react';
import './index.scss';

import Mutil from 'util/mm.js';
const _mm = new Mutil();

import User from 'service/user-service.js';
const _user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEnterKeyUp = this.onEnterKeyUp.bind(this);
    }

    componentWillMount() {
        document.title = 'Login - Shopping Mall';
    }

    onLoginChange(e) {
        const {name, value} = e.target;
        //console.log(name, value);
        this.setState({
            [name]: value
        });
    }

    onSubmit() {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
        checkResult = _user.loginValidation(loginInfo);

        if (checkResult.status) {
            _user.login(loginInfo).then((res) => {
                _mm.setStorage('userInfo', res);
                //console.log(this.state.redirect);
                this.props.history.push(this.state.redirect);
            },(err) => {
                _mm.errorInfo(err);
            });
        } else {
            _mm.errorInfo(checkResult.msg);
        }
    }

    onEnterKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }

    render() {
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">Welcome to Shopping Mall System</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <label htmlFor="Username">Username</label>
                                <input type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    placeholder="Please input your Username"
                                    onChange={this.onLoginChange}
                                    onKeyUp={this.onEnterKeyUp}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Please input your Password"
                                    onChange={e => this.onLoginChange(e)}
                                    onKeyUp={this.onEnterKeyUp}
                                />
                            </div>

                            <button type="submit"
                                className="btn btn-primary btn-block"
                                onClick={this.onSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
