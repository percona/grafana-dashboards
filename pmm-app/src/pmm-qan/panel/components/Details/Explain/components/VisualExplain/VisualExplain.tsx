import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import React from 'react';
import { useExplains } from '../../Explain.hooks';
import { Messages } from '../../../Details.messages';

export const VisualExplain = ({ examples, databaseType }) => {
  const [, , visualExplain] = useExplains(examples, databaseType);

  return (
    <Overlay isPending={false}>
      {visualExplain.error ? <pre data-qa="visual-explain-error">{visualExplain.error}</pre> : null}
      {!visualExplain.error && visualExplain.value ? (
        <div data-qa="visual-explain-value">
          <pre>{visualExplain.value}</pre>
        </div>
      ) : null}
      {!visualExplain.error && !visualExplain.value ? (
        <pre data-qa="visual-explain-no-data">{Messages.noVisualExplain}</pre>
      ) : null}
    </Overlay>
  );
};
