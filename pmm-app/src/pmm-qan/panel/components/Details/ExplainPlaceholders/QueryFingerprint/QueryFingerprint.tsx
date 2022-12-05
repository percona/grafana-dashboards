import React from 'react';
import { Highlight } from 'shared/components/Hightlight/Highlight';
import { QueryFingerprintProps } from './QueryFingerprint.types';
import { replacePlaceholders } from './QueryFingerprint.utils';

const QueryFingerprint: React.FC<QueryFingerprintProps> = ({ fingerprint, placeholders }) => {
  const formatted = replacePlaceholders(fingerprint, placeholders);

  return (
    <Highlight key={formatted} language="sql">
      {formatted}
    </Highlight>
  );
};

export default QueryFingerprint;
