import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export class Layout extends Component {
  displayName = Layout.name

  render() {
    return (
      <Grid>
        <Row>
          {this.props.children}
        </Row>
      </Grid>
    );
  }
}
