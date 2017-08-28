import React from 'react';
import TextFieldGroup from './field';
import { getTotalsByPolarity } from "./actions.js";
import JSONViewer from 'react-json-viewer';
import myStore from './store.js'
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons'
class Private extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters:
      {
        pagesize: '10',
        sortby: '',
        order: ''
      },
      select: 'polarity',
      query: []
    }

    this.onChange = this
      .onChange
      .bind(this);
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.getResults = this.getResults.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);

  }

  componentWillMount() {
    myStore.on("change", this.getResults);
  }
  componentWillUnmount() {
    myStore.removeListener("change", this.getResults);
  }
  getResults() {
    this.setState({
      query: myStore.getAll(),
    });
  }
  onSubmit(e) {
    var query = ''
    for (var key in this.state.filters) {
      if (this.state.filters.hasOwnProperty(key) && this.state.filters[key]) {
        console.log(key);
        if (query !== '') {
          query = query + '&'
        }
        query = query + key + '=' + this.state.filters[key]
      }
    }
    console.log(query);
    e.preventDefault();
    getTotalsByPolarity(this.state.select, query);
  }


  handleOptionChange(e) {
    this.setState({
      select: e
    });
  }

  onChange(e) {
    const filters = { ...this.state.filters };
    filters[e.target.name] = e.target.value;
    this.setState({ filters });
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="col-md-4 col-md-offset-1">
              <button className="btn btn-primary btn-lg"> Search</button>
              <RadioGroup onChange={this.handleOptionChange} horizontal>
                <RadioButton value="polarity">polarity  </RadioButton>
                <RadioButton value="hate_users">Most hatful users  </RadioButton>
              </RadioGroup>
            </div>
            <div className="col-md-4 col-md-offset-2">
              <TextFieldGroup
                label="Sort (user,id,polarity)"
                onChange={this.onChange}
                value={this.state.filters.sortby}
                field="sortby" />
              <TextFieldGroup
                label="order (asc,desc)"
                onChange={this.onChange}
                value={this.state.filters.order}
                field="order" />
              <TextFieldGroup
                label="results per page"
                onChange={this.onChange}
                value={this.state.filters.pagesize}
                field="pagesize" />
            </div>
          </form>
        </div>
        <JSONViewer json={this.state.query} />
        <label className="control-label">Total: {this.state.query.length}</label>

      </div>
    );
  }
}

export default Private;
