import React from 'react';
import { navTitle } from '../App.constants';
import logo from '../assets/pmm-logo.svg';

export const NavBar = () => (
  <div className="header">
    <div className="nav row">
      <img src={logo} className="header-logo" alt="pmm-logo" />
      <p className="app-title">
        {navTitle}
      </p>
    </div>
  </div>
);
