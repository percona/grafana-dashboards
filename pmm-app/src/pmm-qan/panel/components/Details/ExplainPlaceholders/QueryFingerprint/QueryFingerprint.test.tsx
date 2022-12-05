import React from 'react';
import { render, screen } from '@testing-library/react';
import QueryFingerprint from './QueryFingerprint';

const QUERY_WITHOUT_PLACEHOLDERS = `
select
  EVENT_NAME,
  COUNT_STAR,
  SUM_TIMER_WAIT
from
  performance_schema.events_waits_summary_global_by_event_name
`.trim();

const RAW_QUERY_WITH_PLACEHOLDERS = `
select
  column_name
from
  information_schema.columns
where
  table_name = :1
  and column_name in ::2    
`.trim();

const QUERY_WITH_PLACEHOLDERS = `
select
  column_name
from
  information_schema.columns
where
  table_name = :1
  and column_name in :: 2    
`.trim();

const QUERY_WITH_PLACEHOLDERS_FILLED = `
select
  column_name
from
  information_schema.columns
where
  table_name = 'placeholder_1'
  and column_name in ('placeholder_2')    
`.trim();

describe('QueryFingerprint component::', () => {
  it('renders with empty query', () => {
    render(<QueryFingerprint fingerprint="" placeholders={[]} />);
    expect(screen.getByTestId('highlight-code').textContent).toEqual('');
  });

  it('renders with query without placeholders', () => {
    render(<QueryFingerprint fingerprint={QUERY_WITHOUT_PLACEHOLDERS} placeholders={[]} />);
    expect(screen.getByTestId('highlight-code').textContent).toEqual(QUERY_WITHOUT_PLACEHOLDERS);
  });

  it('renders with query with placeholders not filled out', () => {
    render(<QueryFingerprint fingerprint={RAW_QUERY_WITH_PLACEHOLDERS} placeholders={[]} />);
    expect(screen.getByTestId('highlight-code').textContent).toEqual(QUERY_WITH_PLACEHOLDERS);
  });

  it('renders with placeholders (string)', () => {
    render(
      <QueryFingerprint
        fingerprint={RAW_QUERY_WITH_PLACEHOLDERS}
        placeholders={['\'placeholder_1\'', '(\'placeholder_2\')']}
      />,
    );
    expect(screen.getByTestId('highlight-code').textContent).toEqual(QUERY_WITH_PLACEHOLDERS_FILLED);
  });
});
