const EventApplication = React.createClass({
  getInitialState: function() {
    return { events: [],
             sort: "name",
             order: "asc" };
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

  handleAdd(event) {
    let events = this.state.events;
    events.push(event);
    this.setState({ events: events });
  },

  handleDeleteRecord(event) {
    let events = this.state.events.slice();
    let index = events.indexOf(event);
    events.splice(index, 1);
    this.setState({ events: events });
  },

  handleUpdateRecord(old_event, event) {
      let events = this.state.events.slice();
      let index = events.indexOf(old_event);
      events.splice(index, 1, event);
      this.setState({ events: events });
    },

    handleSortColumn(name, order) {
        if (this.state.sort != name) {
          order = 'asc';
        }
        $.ajax({
          url: '/api/events',
          data: { sort_by: name, order: order },
          method: 'GET',
          success: (data) => {
            this.setState({ events: data, sort: name, order: order });
          },
          error: function(xhr, status, error) {
            alert('Cannot sort events: ', error);
          }
        });
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
          <div className="col-md-8">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}
                        sort={this.state.sort}
                        order={this.state.order}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleSortColumn={this.handleSortColumn} />
          </div>
        </div>
      </div>
    )
  }

});
