import React from "react";

class BreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.crumbClick = this.crumbClick.bind(this);
    this.labels = {
      home: "Home",
      help: "Help",
      error: "Error",
      withdrawal: "Amount",
      withdrawalAccount: "Account",
      withdrawalConfirmation: "Confirm",
      withdrawalFavourite: "Favourite",
      withdrawalCustom: "Custom"
    };
  }

  crumbClick(e) {
    this.props.changeScreen(e.target.dataset.crumbNumber);
  }

  render() {
    let crumbs = this.props.crumbs;
    let start = crumbs.indexOf("home");

    if (start !== -1) {
      crumbs = crumbs.slice(start, crumbs.length);
      console.log(crumbs);
      crumbs = crumbs.map((crumb, index) => {
        let number = crumbs.length - index - 1;
        let label = crumb;
        if (this.labels.hasOwnProperty(crumb)) {
          label = this.labels[crumb];
        }
        return <a key={crumb} data-crumb={crumb} data-crumb-number={number}
                  onClick={this.crumbClick} className="crumb">{label}</a>;
      });

      crumbs = crumbs.slice(Math.max(0, crumbs.length-3), crumbs.length);
    } else {
      crumbs = [];
    }
    return (
      <nav className="breadcrumbs">
        {crumbs}
      </nav>
    );
  }
}

export default BreadCrumb;