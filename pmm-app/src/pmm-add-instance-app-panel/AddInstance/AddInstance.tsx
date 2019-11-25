import React from 'react';
import './AddInstance.scss';

const AddInstance = props => {
  const selectInstanceType = type => () => {
    props.selectInstanceType({ type: type });
  };
  return (
    <section className="content-wrapper">
      <h3>How to Add an Instance</h3>
      <nav className="navigation">
        <a href="#" className="navigation__link" onClick={selectInstanceType('rds')}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Add an AWS RDS MySQL or Aurora MySQL Instance
        </a>
        <a href="#" className="navigation__link" onClick={selectInstanceType('postgresql')}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote PostgreSQL Instance
        </a>
        <a href="#" className="navigation__link" onClick={selectInstanceType('mysql')}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote MySQL Instance
        </a>
        <a href="#" className="navigation__link" onClick={selectInstanceType('mongodb')}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote MongoDB Instance
        </a>
        <a href="#" className="navigation__link" onClick={selectInstanceType('proxysql')}>
          <i className="fa fa-pencil" aria-hidden="true"></i> Add a Remote ProxySQL Instance
        </a>
      </nav>
    </section>
  );
};

export default AddInstance;
