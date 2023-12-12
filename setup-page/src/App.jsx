import React, { useState } from 'react';
import { LoadingIcon, NavBar, Notification } from './components';
import { docUrl, messages } from './App.constants';

export function App() {
  const [instanceId, setInstanceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [closing, setClosing] = useState(false);
  const [message, setMessage] = useState(false);
  const onClose = (e) => {
    e.preventDefault();
    setClosing(true);
  };
  const checkInstance = async () => {
    setLoading(true);

    try {
      const response = await fetch('/v1/AWSInstanceCheck', {
        method: 'POST',
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instance_id: instanceId.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      // eslint-disable-next-line no-undef
      window.location.href = '/';
    } catch (error) {
      setMessage(error.message || "Request failed.");
      setShowNotification(true);
      setClosing(false);
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />

      <div className="instance-id-form">
        <h2 className="instance-id-header">{messages.header}</h2>
        <div className="instance-id-pane">
          <p>
            {messages.helpLine1}
            <br />
            {messages.helpLine2}
            {' '}
            <i className="ami-id">{messages.amiId}</i>
          </p>
          <div className="form-wrapper">
            <p className="input-field-wrapper">
              <input
                onChange={(e) => setInstanceId(e.target.value)}
                type="text"
                placeholder="Instance ID"
                className="instance-id-input-field"
              />
              <button
                type="button"
                className="btn button-submit button-primary"
                disabled={loading || !instanceId}
                onClick={checkInstance}
              >
                {loading && <LoadingIcon />}
                {messages.submit}
              </button>
            </p>
            <a
              href={docUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {messages.helpLine3}
            </a>
          </div>
        </div>
      </div>

      {showNotification && <Notification closing={closing} onClose={onClose} message={message} />}
    </>
  );
};

