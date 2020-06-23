import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ClipboardButton, Icon } from '@grafana/ui';
import { Modal } from '@grafana/ui';

import { Messages } from './UpdateModal.messages';
import * as styles from './UpdateModal.styles';
import { CenteredButton, UpdateModalHeader } from 'pmm-update/components';
import { useClickOutside } from 'pmm-update/hooks';
import { UpdateModalProps } from 'pmm-update/types';

export const UpdateModal = ({
  version,
  errorMessage = '',
  isOpen = false,
  isUpdated = false,
  output = '',
  updateFailed = false,
}: UpdateModalProps) => {
  const outputRef = useRef<HTMLPreElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOutputShown, setIsOutputShown] = useState(true);

  useClickOutside(modalRef, () => {
    if (isUpdated) {
      location.reload(true);
    }
  });

  useLayoutEffect(() => {
    // scroll update status to the end.
    const interval = setInterval(() => outputRef.current?.scrollIntoView(false), 500);

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

  const copyToClipboard = useCallback(() => outputRef.current?.textContent ?? '', [outputRef]);

  const chevronIcon = isOutputShown ? 'chevron-down' : 'chevron-up';

  // TODO (nicolalamacchia): componentize this further
  return (
    <Modal title="" className={styles.modal} isOpen={isOpen}>
      <div ref={modalRef} className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <UpdateModalHeader
              isUpdated={isUpdated}
              updateFailed={updateFailed}
              errorMessage={errorMessage}
            />
            {!isUpdated ? (
              <div className="output-content">
                <div className="output-header">
                  <Icon
                    className="output-collapse"
                    data-qa="modal-chevron-icon"
                    name={chevronIcon}
                    onClick={handleToggleShowOutput}
                  />
                  <span>Log</span>
                  <ClipboardButton getText={copyToClipboard} className="text-right" variant="link" size="sm">
                    {Messages.copyToClipboard}
                  </ClipboardButton>
                </div>
                {isOutputShown && (
                  <div className="pre-scrollable output-value">
                    <pre data-qa="modal-output-pre" ref={outputRef}>
                      {output}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="text-center text-block">
                  <h6 data-qa="modal-update-success-text">
                    {Messages.updateSuccessNotice} {version}
                  </h6>
                </div>
                <CenteredButton data-qa="modal-close" variant="primary" onClick={reloadAfterUpdate}>
                  Close
                </CenteredButton>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="backdrop"></div>
    </Modal>
  );
};
