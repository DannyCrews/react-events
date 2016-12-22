const SearchForm = React.createClass({
  handleSearch() {
    let query = ReactDOM.findDOMNode(this.refs.query).value;

    $.ajax({
      url: './api/events/search',
      data: { query: query },
      success: (data) => this.props.handleSearch(data),
      error: (xhr, status, error) => alert('Search error: ', status, xhr, error)
    });
  },

  render() {
    return(
      <input onChange={this.handleSearch}
              type="text"
              className="form-control"
              placeholder="Type search phrase here..."
              ref="query" />
    )
  }
});
