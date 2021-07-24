import React, { Component } from 'react'
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const sortTypes = {
    up: {
        class: 'sort-up',
        fn: (a, b) => a.userId - b.userId
    },
    down: {
        class: 'sort-down',
        fn: (a, b) => b.userId - a.userId
    },
    default: {
        class: 'sort',
        fn: (a, b) => a
    }
};


export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            currentSort: 'default'
        }
        this.filterList = this.filterList.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    /**
     * Function filter the list of base on the search input provided by the user
     * @param {array} list of todos
     * @return {array} //list of filtered todos
     */
    filterList = function (list) {
        if (!this.state.searchText.trim()) {
            return list;
        } else {
            const text = this.state.searchText;
            if (isNaN(text)) {
                return list.filter((item) => {
                    if (item.title) { // check whether this property exit in the list object or not.
                        return item.title.toLowerCase().includes(this.state.searchText.toLowerCase());
                    }
                });
            } else {
                return list.filter((item) => item.userId == this.state.searchText);
            }
        }
    }

    /**
     * this Function gets the keys from the object.
     * @return {array} //list of keys/properties
     */
    getKeys = function () {
        return Object.keys(this.props.data[0]);
    }

    /**
     * this Function prints the table rows
     * @return {object} an JSX
     */
    getRowsData = function () {
        var items = this.filterList(this.props.data);
        var keys = this.getKeys();
        return items.sort(sortTypes[this.state.currentSort].fn).map((row, index) => {
            return <tr key={index}><TableRow key={row.id} data={row} keys={keys} /></tr>
        })
    }

    /**
     * this Function handle the input of the search bar.
     * @param {object} event
     */
    handleInput = function (event) {
        this.setState({ searchText: event.target.value });
    }

    /** this function called every time the sort button is clicked
     * it will change the currentSort value to the next one
     */
    handleSortChange = function () {
        const { currentSort } = this.state;
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        this.setState({
            currentSort: nextSort
        });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.searchText}
                    onChange={this.handleInput}
                    placeholder='Enter UserId or title for search'
                />
                <table>
                    <TableHeader
                        data={this.getKeys()}
                        sortTypes={sortTypes}
                        currentSort={this.state.currentSort}
                        onSortChange={this.handleSortChange}
                    />
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        )
    }
}