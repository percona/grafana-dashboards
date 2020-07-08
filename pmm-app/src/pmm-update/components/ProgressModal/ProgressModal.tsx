import React, {
  useCallback, useLayoutEffect, useRef, useState, FC
} from 'react';
import { ClipboardButton, Icon, Modal } from '@grafana/ui';


import { CenteredButton, ProgressModalHeader } from 'pmm-update/components';
import { useClickOutside } from 'pmm-update/hooks';
import { ProgressModalProps } from 'pmm-update/types';
import * as styles from './ProgressModal.styles';
import { Messages } from './ProgressModal.messages';

export const ProgressModal: FC<ProgressModalProps> = ({
  version,
  errorMessage = '',
  isOpen = false,
  isUpdated = false,
  output = '',
  updateFailed = false,
}) => {
  const outputRef = useRef<HTMLPreElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOutputShown, setIsOutputShown] = useState(true);

  useClickOutside(modalRef, () => {
    if (isUpdated) {
      // eslint-disable-next-line no-restricted-globals
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
    setIsOutputShown((isOutputShown) => !isOutputShown);
  };

  const reloadAfterUpdate = () => {
    // eslint-disable-next-line no-restricted-globals
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
            <ProgressModalHeader
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
                    name={chevronIcon as any}
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
                    {Messages.updateSuccessNotice}
                    {' '}
                    {version}
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
      <div className="backdrop" />
    </Modal>
  );
};
