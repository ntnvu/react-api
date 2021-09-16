import React, { Component } from "react";
import Contacts from "./components/contact";
import LoginMetaMask from "./components/login";

class App extends Component {

  state = {
    contacts: []
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => {
        this.setState({ contacts: data })
      })
      .catch(console.log)
  }

  render() {
    return (
      <>
        <LoginMetaMask></LoginMetaMask>
        <Contacts contacts={this.state.contacts} />
      </>
    );
  }
}

export default App;
