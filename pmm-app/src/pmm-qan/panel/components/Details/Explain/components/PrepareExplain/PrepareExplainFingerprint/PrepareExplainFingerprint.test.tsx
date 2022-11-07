import React from 'react';
import { render } from '@testing-library/react';
import PrepareExplainFingerprint from './PrepareExplainFingerprint';

const fingerprint = `insert into
  pmm.Persons
values
  (:1, :2, :3, :4, :5)`;

describe('PrepareExplainFingerprint component', () => {
  it('Component shows query without replaced placeholders', () => {
    const { container } = render(<PrepareExplainFingerprint fingerprint={fingerprint} placeholders={[]} />);

    expect(container.textContent).toMatch(fingerprint);
  });
});
