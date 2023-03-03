import React, { useState } from 'react';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Collapse, useStyles2 } from '@grafana/ui';
import { Table } from '../../../../../shared/components/Elements/Table';
import { LinkTooltip } from '../../../../../shared/components/Elements/LinkTooltip/LinkTooltip';
import { getStyles } from './Metadata.styles';

const Metadata = ({ metadata, loading }) => {
  const styles = useStyles2(getStyles);
  const [isMetadataOpen, setMetadataVisibility] = useState(true);

  const nameColumn = (item) => (
    <span className={styles.metadataColumn}>
      <span>{item.name}</span>
    </span>
  );

  const valueColumn = (item) => (
    <span className={styles.metadataColumn}>
      <span>{item.value}</span>
      <LinkTooltip tooltipText={item.tooltip} icon="info-circle" />
    </span>
  );

  const tableHead = {
    main: 'Metadata',
    first: 'Name',
    second: 'Value',
  };

  const columns = [
    {
      Header: tableHead.first,
      accessor: nameColumn,
    },
    {
      Header: tableHead.second,
      accessor: valueColumn,
    },
  ];

  return (
    <Overlay size={35}>
      <Collapse
        collapsible
        label={tableHead.main}
        isOpen={isMetadataOpen}
        onToggle={() => setMetadataVisibility(!isMetadataOpen)}
      >
        <Table
          columns={columns}
          data={metadata}
          loading={loading}
          noData={null}
        />
      </Collapse>
    </Overlay>
  );
};

export default Metadata;
