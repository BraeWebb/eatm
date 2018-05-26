import React from "react";

class BreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.crumbClick = this.crumbClick.bind(this);
  }

  crumbClick(e) {
    this.props.changeScreen(e.target.dataset.crumbNumber);
  }

  render() {
    let crumbs = this.props.crumbs.map((crumb, index) => {
      let number = this.props.crumbs.length - index - 1;
      return <a key={crumb} data-crumb={crumb} data-crumb-number={number}
                onClick={this.crumbClick}>{crumb} > </a>;
    });
    return (
      <nav className="breadcrumbs">
        {crumbs.splice(Math.max(0, crumbs.length-3), crumbs.length)}
      </nav>
    );
  }
}

export default BreadCrumb;