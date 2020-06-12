import React, { useLayoutEffect, useState } from 'react';

import { Messages } from './UpdateModal.messages';
import * as styles from './UpdateModal.styles';

interface UpdateModalProps {
  canBeReloaded: boolean;
  errorMessage: string;
  isUpdated: boolean;
  output: string;
  updateFailed: boolean;
  version: string;
}

export const UpdateModal = ({
  canBeReloaded,
  errorMessage,
  isUpdated,
  output,
  updateFailed,
  version,
}: UpdateModalProps) => {
  const scrollableRef = React.createRef<HTMLPreElement>();
  const [isOutputShown, setIsOutputShown] = useState(true);

  // TODO (nicolalamacchia): handle click outside the modal (use a ref) and the esc key
  // body.addEventListener('click', event => {
  //   if ($(event.target).hasClass('modal-backdrop') && $scope.canBeReloaded) {
  //     location.reload(true);
  //   }
  // });

  // body.addEventListener('keydown', event => {
  //   $scope.keydownCode = event.code;
  //   event.key === escKeyCode && $scope.canBeReloaded ? location.reload(true) : event.stopPropagation();
  // });

  useLayoutEffect(() => {
    // scroll update status to the end.
    const interval = setInterval(() => scrollableRef.current?.scrollIntoView(false), 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleToggleShowOutput = () => {
    setIsOutputShown(isOutputShown => !isOutputShown);
  };

  const reloadAfterUpdate = () => {
    location.reload(true);
  };

  // TODO (nicolalamacchia): componentize this
  return (
    <div className={`modal-dialog ${styles.modal}`} role="document">
      {!isUpdated ? (
        <div className="modal-content">
          <div className="modal-body">
            {!errorMessage.length ? (
              <h4>
                {Messages.updateInProgress}{' '}
                {/* {isLoaderShown && <i className="fa fa-spinner fa-spin"></i>} */}
              </h4>
            ) : null}
            {updateFailed && (
              <>
                <h4>{Messages.updateFailed}</h4>
                <h4>{errorMessage}</h4>
              </>
            )}
            <div className="output-content">
              <div className="output-header">
                <i
                  className={`fa output-collapse ${isOutputShown ? 'fa-chevron-down' : 'fa-chevron-up'}`}
                  onClick={handleToggleShowOutput}
                ></i>
                <span></span>
                <span className="text-secondary text-primary text-right" clipboard-button="output">
                  {Messages.copyToClipboard}
                </span>
              </div>

              {isOutputShown && (
                // TODO (nicolalamacchia): remove IDs
                <div className="pre-scrollable output-value">
                  <pre ref={scrollableRef}>{output}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {/*{isUpdated && !isLoaderShown ? (*/}
      {isUpdated ? (
        <div className="modal-content">
          <div className="modal-body">
            <h4>{Messages.updateSucceeded}</h4>
            <div>
              <div>
                <div className="text-center text-block">
                  <h6>
                    {Messages.updateSuccessNotice} {version}
                  </h6>
                </div>
              </div>
              <div className="btn-holder">
                <div>
                  <button
                    className="btn btn-secondary btn-block"
                    data-dismiss="modal"
                    onClick={reloadAfterUpdate}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
