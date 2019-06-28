import React, { PureComponent } from 'react';
var classNames = require('classnames');

class PageSelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  click(value) {
    this.props.onPageClick(value);
  }
  render() {
    let elements = [];

    for (let i = 1; i <= this.props.pageCount; i++) {
      let isActive = i === this.props.pageNum;

      elements.push(
        <li onClick={() => this.click(i)} className={isActive ? "active" : ""}>
          <a href="#">{i}</a>
        </li>);
    }

    return(
      <ul className="pagination">
        {elements}
      </ul>);
  }
}

export default PageSelector;