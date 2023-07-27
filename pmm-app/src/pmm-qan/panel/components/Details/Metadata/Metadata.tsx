import React, { useState } from 'react';
import { Overlay } from 'shared/components/Elements/Overlay/Overlay';
import { Collapse, useStyles2 } from '@grafana/ui';
import { Table } from 'shared/components/Elements/Table';
import { getStyles } from './Metadata.styles';
import { metadataTableHead } from './Metadata.constants';
import { OVERLAY_LOADER_SIZE } from '../Details.constants';

const Metadata = ({ metadata, loading }) => {
  const styles = useStyles2(getStyles);
  const [metadataOpen, setMetadataOpen] = useState(false);

  const nameColumn = (item) => (
    <span className={styles.metadataColumn}>
      <span>{item.name}</span>
    </span>
  );

  const valueColumn = (item) => (
    <span className={styles.metadataColumn}>
      <span>{item.value}</span>
    </span>
  );

  const columns = [
    {
      Header: metadataTableHead.first,
      accessor: nameColumn,
    },
    {
      Header: metadataTableHead.second,
      accessor: valueColumn,
    },
  ];

  return (
    <Overlay size={OVERLAY_LOADER_SIZE}>
      <Collapse
        collapsible
        label={metadataTableHead.main}
        isOpen={metadataOpen}
        onToggle={() => setMetadataOpen((open) => !open)}
      >
        <Table
          columns={columns}
          data={metadata}
          loading={loading}
        />
      </Collapse>
    </Overlay>
  );
};

export default Metadata;
