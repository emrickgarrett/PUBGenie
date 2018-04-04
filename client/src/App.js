import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import createStore from "./store";
import Layout from './scenes/layout'

let history = createHistory();
let store = createStore(history);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout history={history} />
      </Provider>
    );
  }
}

export default App;
