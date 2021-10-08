import React from 'react';
import { Scrollbar } from 'shared/components/Elements/Scrollbar/Scrollbar';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Table } from 'shared/components/Elements/Table';
import { useExplains } from '../../Explain.hooks';
import { processClassicExplain } from '../../Explain.tools';
import { Messages } from '../../../Details.messages';
import { ReplacedQueryMessage } from '../ReplacedQueryMessage/ReplacedQueryMessage';

export const ClassicExplain = ({ examples, databaseType }) => {
  const [, classicExplain] = useExplains(examples, databaseType);
  const { value: explain } = classicExplain;
  const processedExplain = processClassicExplain(explain?.explain_result);

  return (
    <Overlay isPending={classicExplain.loading}>
      <ReplacedQueryMessage originalQuery={explain?.explained_query} isVisible={explain?.is_dml} />
      <Scrollbar>
        {classicExplain.error ? <pre data-testid="classic-explain-error">{classicExplain.error}</pre> : null}
        {!classicExplain.error
        && processedExplain.rows.length ? (
          <div data-testid="classic-explain-value">
            <Table
              columns={processedExplain.columns}
              data={processedExplain.rows}
              noData={null}
            />
          </div>
          ) : null}
        {!classicExplain.error && !processedExplain.rows.length ? (
          <pre data-testid="classic-explain-no-data">{Messages.noClassicExplain}</pre>
        ) : null}
      </Scrollbar>
    </Overlay>
  );
};
