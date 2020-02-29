import React, { ReactElement } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

interface SpinnerInterface {
  size: 'small' | 'medium' | 'large';
}
const Spinner = ({ size = 'medium' }: SpinnerInterface): ReactElement => {
  const getSizePX = size => {
    switch (size) {
      case 'large':
        return '50px';
      case 'medium':
        return '36px';
      case 'small':
        return '20px';
      default:
        return '36px';
    }
  };
  return <i className="fa fa-spinner fa-spin spinner" style={{ color: 'white', fontSize: getSizePX(size) }}></i>;
};

export default Spinner;
