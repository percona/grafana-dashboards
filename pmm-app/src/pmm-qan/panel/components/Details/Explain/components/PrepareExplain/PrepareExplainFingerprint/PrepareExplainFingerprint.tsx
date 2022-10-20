import React from 'react';
import { Highlight } from 'shared/components/Hightlight/Highlight';
import { PrepareExplainFingerprintProps } from './PrepareExplainFingerprint.types';
import { replacePlaceholders } from './PrepareExplainFingerprint.utils';

const PrepareExplainFingerprint: React.FC<PrepareExplainFingerprintProps> = ({
  fingerprint,
  placeholders,
}) => {
  const formatted = replacePlaceholders(fingerprint, placeholders);

  return (
    <Highlight key={formatted} language="sql">
      {formatted}
    </Highlight>
  );
};

export default PrepareExplainFingerprint;
