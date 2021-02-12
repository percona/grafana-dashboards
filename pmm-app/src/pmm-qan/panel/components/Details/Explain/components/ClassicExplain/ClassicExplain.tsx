import React from 'react';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Table } from '@grafana/ui';
import { useExplains } from '../../Explain.hooks';
import { processClassicExplain } from '../../Explain.tools';
import { Messages } from '../../../Details.messages';

export const ClassicExplain = ({ examples, databaseType }) => {
  const [, classicExplain] = useExplains(examples, databaseType);

  return (
    <Overlay isPending={classicExplain.loading}>
      <Scrollbar>
        {classicExplain.error ? <pre data-qa="classic-explain-error">{classicExplain.error}</pre> : null}
        {!classicExplain.error && processClassicExplain(classicExplain.value).rows.length ? (
          <div data-qa="classic-explain-value">
            <Table
              columns={processClassicExplain(classicExplain.value).columns}
              data={processClassicExplain(classicExplain.value).rows}
              noData={null}
            />
          </div>
        ) : null}
        {!classicExplain.error && !processClassicExplain(classicExplain.value).rows.length ? (
          <pre data-qa="classic-explain-no-data">{Messages.noClassicExplain}</pre>
        ) : null}
      </Scrollbar>
    </Overlay>
  );
};
