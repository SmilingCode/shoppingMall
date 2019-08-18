import React from 'react';

class ListSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: 'productId', // productId, productName
            searchKeyword: ''
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
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
    }

    render() {
        return (
            <div className="col-md-12">
                <form className="form-inline" onSubmit={this.onSearch}>
                    <div className="form-group">
                        <select className="form-control" name="searchType" onChange={this.onSearchChange}>
                            <option value="productId">search by product id</option>
                            <option value="productName">search by product name</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="text"
                            className="form-control"
                            placeholder="keyword"
                            name="searchKeyword"
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
