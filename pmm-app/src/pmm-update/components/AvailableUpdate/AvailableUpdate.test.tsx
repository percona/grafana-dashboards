import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { AvailableUpdate } from './AvailableUpdate';

jest.mock('shared/components/helpers/notification-manager');

const nextFullVersion = 'x.y.z-rc.j+1234567890';
const nextVersion = 'x.y.z';
const newsLink = 'https://percona.com';
const nextVersionDate = '23 Jun';

const nextVersionDetails = {
  nextVersionDate, nextVersion, nextFullVersion, newsLink,
};

describe('AvailableUpdate::', () => {
  it('should show only the short version by default', () => {
    render(<AvailableUpdate nextVersionDetails={nextVersionDetails} />);

    expect(screen.getByTestId('update-latest-version').textContent).toEqual(nextVersion);
  });

  it('should show the news link if present', () => {
    render(<AvailableUpdate nextVersionDetails={nextVersionDetails} />);

    expect(screen.getByTestId('update-news-link')).toBeTruthy();
  });

  it('should show the full version on alt-click', () => {
    render(<AvailableUpdate nextVersionDetails={nextVersionDetails} />);

    fireEvent.click(screen.getByTestId('update-latest-section'), { altKey: true });

    expect(screen.getByTestId('update-latest-version').textContent).toEqual(nextFullVersion);
  });
});
