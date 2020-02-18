import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push('/signup');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return withRouter(
    connect(
      (state) => ({
        auth: state.user.authenticated,
      }),
      null,
    )(ComposedComponent),
  );
};
