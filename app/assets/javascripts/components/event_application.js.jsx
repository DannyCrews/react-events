const EventApplication = React.createClass({
  getInitialState() {
    return { events: [] };
  },

  componentDidMount() {
    this.getDataFromApi();
  },

  getDataFromApi() {
      $.ajax({
        url: '/api/events',
        success: (data) => this.setState({ events: data }),
        error: (xhr, status, error) => alert('Cannot get data from API: ', error)
      });
  },

  handleSearch(events) {
    this.setState({ events: events });
  },

  render() {
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>React Event Application</h1>
        </div>
        <div className="row">
          <div className="col-md-4">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}/>
          </div>
        </div>
      </div>
    )
  }
});
