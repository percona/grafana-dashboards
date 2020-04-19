import React from 'react';

export const Failed = failed => {
  const sum = failed.reduce((acc, val) => acc + val, 0);
  return (
    <div>
      {sum} ({failed.join(' / ')})
    </div>
  );
};
