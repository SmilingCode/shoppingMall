import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }
    // get user search info
    onSearchChange(e) {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }
    // user click search button
    onSearch(event) {
        event.preventDefault();
        this.props.onSearch(this.state.orderNumber);
    }

    render() {
        return (
            <div className="col-md-12">
                <form className="form-inline" onSubmit={this.onSearch}>
                    <div className="form-group">
                        <select className="form-control">
                            <option value="orderId">search by order id</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="Order Number"
                            name="orderNumber"
                            onChange={this.onSearchChange}
                        />
                    </div>
                    <button className="btn btn-primary">Search</button>
                </form>
            </div>
        )
    }
}

export default ListSearch;
