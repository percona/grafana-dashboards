import React, { Component } from "react";
import "./AddInstance.scss";

class AddInstance extends Component {
  render() {
    return (
      <section className="content-wrapper">
        <h3>How to Add an Instance</h3>
        <nav className="navigation">
          <a href="/add-remote-postgresql" className="navigation__link">
            <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote
            PostgreSQL Instance
          </a>
          <a href="/add-remote-mysql" className="navigation__link">
            <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote
            MySQL Instance
          </a>
          <a href="/add-remote-mongodb" className="navigation__link">
            <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote
            MongoDB Instance
          </a>
          <a href="/add-remote-proxysql" className="navigation__link">
            <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote
            ProxySQL Instance
          </a>
        </nav>
      </section>
    );
  }
}

export default AddInstance;
