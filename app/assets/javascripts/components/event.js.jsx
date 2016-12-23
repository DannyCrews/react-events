const Event = React.createClass({
  getInitialState() {
    return { edit: false  };
  },

  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },

  handleToggle(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },

  handleDelete(e) {
    e.preventDefault();

    $.ajax({
      method: 'DELETE',
      url: '/api/events/' + this.props.event.id,
      success: (data) => {this.props.handleDeleteRecord(this.props.event);},
      error: (xhr, status, error) => {
        alert('Cannot delete the requested record: ', error);
      }
    });
  },

  recordValue(field) {
      return ReactDOM.findDOMNode(this.refs[field]).value;
    },

  handleUpdate(e) {
    e.preventDefault();

    if (this.validRecord()) {
      let event_data = {
        name: this.recordValue("name"),
        description: this.recordValue("description"),
        date: this.recordValue("date"),
        place: this.recordValue("place")
      };

      $.ajax({
        method: 'PUT',
        url: '/api/events/' + this.props.event.id,
        data: { event: event_data },
        success: (data) => {
          this.props.handleUpdateRecord(this.props.event, data);
          this.setState({ edit: false });
        },
        error: (xhr, status, error) => {
          alert('Cannot update requested record: ', error);
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  },

  validRecord() {
    if (this.recordValue("name") &&
        this.recordValue("place") &&
        this.recordValue("date") &&
        this.recordValue("description")) {
      return true;
    } else {
      return false;
    }
  },

  renderRecord() {
    let event = this.props.event;
    return(
      <tr>
        <td>{event.name}</td>
        <td>{event.event_date}</td>
        <td>{event.place}</td>
        <td>{event.description}</td>
        <td>
          <a className="btn btn-danger btn-xs"
             onClick={this.handleDelete} >
            Delete
          </a>
          <a className="btn btn-primary btn-xs"
             onClick={this.handleToggle} >
             Edit
          </a>
        </td>
      </tr>
    );
  },

  renderForm() {
    return(
      <tr>
        <td>
          <input name="name"
                 defaultValue={this.props.event.name}
                 className="form-control"
                 type="text"
                 ref="name"
          />
        </td>
        <td>
          <input name="event_date"
                 defaultValue={this.props.event.event_date}
                 className="form-control"
                 type="date"
                 ref="date"
          />
        </td>
        <td>
          <input name="place"
                 defaultValue={this.props.event.place}
                 className="form-control"
                 type="text"
                 ref="place"
          />
        </td>
        <td>
          <input name="description"
                 defaultValue={this.props.event.description}
                 className="form-control"
                 type="text"
                 ref="description"
          />
        </td>
        <td>
          <a className="btn btn-success btn-sm"
             onClick={this.handleUpdate}>
            Save
          </a>
          <a className="btn btn-default btn-sm"
             onClick={this.handleToggle} >
            Cancel
          </a>
        </td>
      </tr>
    );
  },

  render() {
    if (this.state.edit) {
      return(this.renderForm());
    } else {
      return(this.renderRecord());
    }
  }
});
