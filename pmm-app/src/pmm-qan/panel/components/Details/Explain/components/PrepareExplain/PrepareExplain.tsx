import React from 'react';

import { useStyles } from '@grafana/ui';
import { PrepareExplainProps } from './PrepareExplain.types';
import { Messages } from './PrepareExplain.messages';
import PrepareExplainForm from './PrepareExplainForm/PrepareExplainForm';
import { getStyles } from './PrepareExplain.styles';

const PrepareExplain: React.FC<PrepareExplainProps> = ({ examples, onPlaceholdersSubmit }) => {
  const styles = useStyles(getStyles);

  return (
    <div className={styles.container}>
      <div className={styles.follow}>{Messages.follow}</div>
      {examples.map((example) => (
        <PrepareExplainForm
          key={example.fingerprint}
          example={example}
          onPlaceholdersSubmit={onPlaceholdersSubmit}
        />
      ))}
    </div>
  );
};

export default PrepareExplain;
