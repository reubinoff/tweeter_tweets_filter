import React from 'react';
import TextFieldGroup from './field';
import { generalSearch } from "./actions.js";
import JSONViewer from 'react-json-viewer';
import myStore from './store.js'

class Public extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filters:
            {
                user: '',
                polarity: '',
                ref: '',
                pagesize: '10',
                sortby:'',
                order : ''
            },

            query: []
        }

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
        this.getResults = this.getResults.bind(this);
    }

    componentWillMount() {
        myStore.on("query", this.getResults);
        generalSearch();
    }
    componentWillUnmount() {
        myStore.removeListener("query", this.getResults);
    }
    getResults() {
        this.setState({
            query: myStore.get_query(),
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
        e.preventDefault();
        generalSearch(query);
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
                        <TextFieldGroup
                            label="user"
                            onChange={this.onChange}
                            value={this.state.filters.user}
                            field="user" />
                        <TextFieldGroup
                            label="polarity"
                            onChange={this.onChange}
                            value={this.state.filters.polarity}
                            field="polarity" />
                        <TextFieldGroup
                            label="results per page"
                            onChange={this.onChange}
                            value={this.state.filters.pagesize}
                            field="pagesize" />
                        <TextFieldGroup
                            label="ref"
                            onChange={this.onChange}
                            value={this.state.filters.ref}
                            field="ref" />
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
                    </div>
                </form>
                </div>
                <JSONViewer json={this.state.query} />
                <label className="control-label">Total: {this.state.query.length}</label>

            </div>
        );
    }
}

export default Public;
