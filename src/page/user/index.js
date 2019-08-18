import React from 'react';
import PageTitle from 'component/page-title/index.js';

import Mutil from 'util/mm.js';
const _mm = new Mutil();
import User from 'service/user-service.js';
const _user = new User();

import Pagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            firstLoading: true
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    // when user change the page number
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res, () => {
                this.setState({
                    firstLoading: false
                });
            });
        }, err => {
            _mm.errorInfo(err);
        });
    }

    render() {
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                {
                    this.state.firstLoading ? 'User Data Loading...' : 'There is no any relevant user info'
                }
                </td>
            </tr>
        );
        let tableContent = this.state.list.length > 0 ? listBody : listError;
        return (
            <div id="page-wrapper">
                <PageTitle title="User List" />
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-borderd">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>CreatedTime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent}
                            </tbody>
                        </table>
                        <Pagination
                            current={this.state.pageNum}
                            total={this.state.total}
                            hideOnSinglePage
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserList;
