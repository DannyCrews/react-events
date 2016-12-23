const EventTable = React.createClass ({

  handleDeleteRecord(event) {
    this.props.handleDeleteRecord(event);
  },

  handleUpdateRecord(old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },

  render() {
    let events = [];

    this.props.events.forEach((event) => {
      events.push(<Event event={event}
                              key={'event' + event.id}
                              handleDeleteRecord={this.handleDeleteRecord}
                              handleUpdateRecord={this.handleUpdateRecord} />);
    });

    return(
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="col-md-3">Name</th>
            <th className="col-md-2">Date</th>
            <th className="col-md-3">Place</th>
            <th className="col-md-3">Description</th>
            <th className="col-md-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events}
        </tbody>
      </table>
    )
  }
});
