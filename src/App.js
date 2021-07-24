import React, { Component } from 'react'
import axios from 'axios'
import Table from './components/Table';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
  }
  /**
   * this Function gets the todos list by sending a request to an API.
   * It sets the state of the component as well.
   */
  async getData() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos');
    this.setState({ loading: false, users: res.data });
  }
  /**
   * A lifecycle function which is invoked immediately after a component is mounted
   */
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        {
          this.state.loading ? (<Loader
            type="Circles"
            color="#00BFFF"
            height={100}
            width={100}
          />) : (<Table data={this.state.users} />)
        }
      </>
    )
  }
}

export default App;
