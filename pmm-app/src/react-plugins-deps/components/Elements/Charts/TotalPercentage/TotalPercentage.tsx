import './TotalPercentage.scss';
import React from 'react';

export const TotalPercentage = ({ width }) => {
  return (
    <div className="meter">
      <span style={{ width: `${width}%` }}></span>
    </div>
  );
};
