import React, { useState } from 'react';
import axios from 'axios';
import { LoadingIcon, NavBar, Notification } from './components';
import { docUrl, messages } from './App.constants';

const App = () => {
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
      await axios.post('/v1/AWSInstanceCheck', {
        instance_id: instanceId.trim(),
      });
      // eslint-disable-next-line no-undef
      window.location.href = '/';
    } catch (error) {
      setMessage(error.response.data.message ? error.response.data.message : error.message);
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

export default App;
