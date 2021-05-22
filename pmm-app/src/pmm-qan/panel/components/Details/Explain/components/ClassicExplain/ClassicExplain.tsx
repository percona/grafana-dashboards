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

  const explain = classicExplain.value?.output;

  return (
    <Overlay isPending={classicExplain.loading}>
      <ReplacedQueryMessage originalQuery={explain?.explained_query} isVisible={explain?.is_dml} />
      <Scrollbar>
        {classicExplain.error ? <pre data-qa="classic-explain-error">{classicExplain.error}</pre> : null}
        {!classicExplain.error
        && processClassicExplain(
          explain?.is_dml ? explain?.explain_result : explain,
        ).rows.length ? (
          <div data-qa="classic-explain-value">
            <Table
              columns={
                processClassicExplain(
                  explain?.is_dml ? explain?.explain_result : explain,
                ).columns
              }
              data={
                processClassicExplain(
                  explain?.is_dml ? explain?.explain_result : explain,
                ).rows
              }
              noData={null}
            />
          </div>
          ) : null}
        {!classicExplain.error
        && !processClassicExplain(
          explain?.is_dml ? explain?.explain_result : explain,
        ).rows.length ? (
          <pre data-qa="classic-explain-no-data">{Messages.noClassicExplain}</pre>
          ) : null}
      </Scrollbar>
    </Overlay>
  );
};
