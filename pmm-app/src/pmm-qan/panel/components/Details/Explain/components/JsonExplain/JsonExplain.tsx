import React from 'react';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { ReactJSON } from 'shared/components/Elements/ReactJSON/ReactJSON';
import { Messages } from '../../../Details.messages';
import { useExplains } from '../../Explain.hooks';

export const JsonExplain = ({ examples, databaseType }) => {
  const [jsonExplain] = useExplains(examples, databaseType);

  return (
    <Overlay isPending={jsonExplain.loading}>
      <Scrollbar>
        {jsonExplain.error ? <pre data-testid="json-explain-error">{jsonExplain.error}</pre> : null}
        {!jsonExplain.error && jsonExplain.value ? (
          <div data-testid="json-explain-value">
            <ReactJSON json={JSON.parse(jsonExplain.value)} />
          </div>
        ) : null}
        {!jsonExplain.error && !jsonExplain.value ? (
          <pre data-testid="json-explain-no-data">{Messages.noJsonExplain}</pre>
        ) : null}
      </Scrollbar>
    </Overlay>
  );
};
