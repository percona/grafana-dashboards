import './TotalPercentage.scss';
import React from 'react';

export const TotalPercentage = ({ width }) => (
  <div className="meter">
    <span style={{ width: `${width}%` }} />
  </div>
);
