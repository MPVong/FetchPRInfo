import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PRInformation from "./components/PRInformation";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={PRInformation} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
