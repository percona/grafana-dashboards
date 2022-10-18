import { useStyles } from '@grafana/ui';
import React from 'react';
import { MAX_QUERY_LENGTH_DOCS_LINK } from './ParseError.constants';
import { Messages } from './ParseError.messages';
import { getStyles } from './ParseError.styles';

const ParseError: React.FC = () => {
  const styles = useStyles(getStyles);

  return (
    <pre data-testid="example-query-invalid">
      {Messages.start}
      <a className={styles.link} href={MAX_QUERY_LENGTH_DOCS_LINK} target="_blank" rel="noreferrer">
        {Messages.docsLink}
      </a>
      {Messages.rest}
    </pre>
  );
};

export default ParseError;
