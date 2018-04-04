import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import HomePage from "./home";
import PropTypes from 'prop-types'


class Layout extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <Switch>
          <Route exact path={"/"} component={HomePage} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

Layout.proptypes = {
  history: PropTypes.object.isRequired
};

export default Layout;
