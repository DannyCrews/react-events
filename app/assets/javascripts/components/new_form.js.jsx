const NewForm = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },

  getInitialState() {
    return {
      name: '',
      place: '',
      event_date: '',
      description: ''
    }
  },

  handleAdd(e) {
    e.preventDefault();
    let self = this;
    if (this.validForm()) {
      $.ajax({
        url: '/api/events',
        method: 'POST',
        data: { event: self.state },
        success: (data) => {
          this.props.handleAdd(data);
          this.setState(this.getInitialState());
        },
        error: (xhr, status, error) => {
          alert('Cannot add a new record: ', error);
        }
      })
    } else {
      alert('Please fill in all fields.');
    }
  },

  validForm() {
    if (this.state.name && this.state.place &&
        this.state.event_date && this.state.description) {
      return true;
    } else {
      return false;
    }
  },

  handleChange(e) {
    let input_name = e.target.name;
    let value = e.target.value;
    this.setState({ [input_name] : value});
  },

  render() {
    return(
      <form className="form-inline" onSubmit={this.handleAdd}>
        <div className="form-group">
          <input type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  ref="name"
                  value={this.state.name}
                  onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                  className="form-control"
                  name="place"
                  placeholder="Place"
                  ref="place"
                  value={this.state.place}
                  onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="date"
                 className="form-control"
                 name="event_date"
                 placeholder="Event date"
                 ref="event_date"
                 value={this.state.event_date}
                 onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text"
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  ref="description"
                  value={this.state.description}
                  onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
    )
  }

});
