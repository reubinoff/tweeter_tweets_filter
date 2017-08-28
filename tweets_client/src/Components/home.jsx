import React from 'react';
import JSONViewer from 'react-json-viewer';


import myStore from './store.js'
import { getTotalsByPolarity } from "./actions.js";

class Home extends React.Component {
  constructor() {
    super();
    this.getResults = this.getResults.bind(this);

    this.state = {
      results: myStore.getAll()
    };

  }

  componentWillMount() {
    myStore.on("change", this.getResults);
    getTotalsByPolarity('polarity');
  }
  componentWillUnmount() {
    myStore.removeListener("change", this.getResults);
  }

  getResults() {
    this.setState({
      results: myStore.getAll(),
    });
  }
  render() {
    // 0 = negative, 2 = neutral, 4 = positive
    const polarity_map = { 0: 'negative', 2: 'neutral', 4: 'positive' }
  
    const results = this.state.results.map(item => {
      return { 'polarity' :polarity_map[item._id],'total': item.count};
    })
    return (
      <div className="container-fluid">
        <div className={'my-pretty-chart-container'}>
          <JSONViewer json={results} />
        </div>
      </div>
    );
  }
}

export default Home;
