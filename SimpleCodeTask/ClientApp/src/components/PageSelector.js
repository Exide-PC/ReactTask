import React, { PureComponent } from 'react';

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
    const { pageCount, pageNum } = this.props;

    for (let i = 1; i <= pageCount; i++) {
      let isActive = i === pageNum;

      elements.push(
        <li onClick={() => this.click(i)} className={isActive ? "active" : ""}>
          <a>{i}</a>
        </li>);
    }

    return(
      <ul className="pagination">
        {elements}
      </ul>);
  }
}

export default PageSelector;