var EventApplication = React.createClass({
  render() {
    return(
      <div className="container">
        <div className="jumbotron">
          <h1>React Event Application</h1>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable/>
          </div>
        </div>
      </div>
    )
  }
});
