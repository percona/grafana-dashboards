import React from 'react';
import { CloseIcon } from './CloseIcon';

export const Notification = ({ closing, onClose, message }) => (
  <div className={`notification-wrapper ${closing ? 'slide-up' : 'slide-down'}`}>
    <div
      className="notification-notice"
    >
      <div className="notification-notice-content">
        <div className="notification-notice-message">
          {message}
        </div>
      </div>
      <a tabIndex="0" href="#close" className="notification-notice-close" onClick={onClose}>
        <span className="notification-close-x">
          <span
            role="img"
            aria-label="close"
            className="anticon anticon-close notification-close-icon"
          >
            <CloseIcon />
          </span>
        </span>
      </a>
    </div>
  </div>
);
