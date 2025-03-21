import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

jest.mock('shared/components/helpers/notification-manager');

describe('Modal window::', () => {
  it('Should render modal successfully', () => {
    const onClose = jest.fn();
    const root = render(<Modal onClose={onClose} isVisible title="test" />);

    expect(root.queryAllByTestId('modal-background').length).toEqual(1);
    expect(root.queryAllByTestId('modal-body').length).toEqual(1);
    expect(root.queryAllByTestId('modal-close-button').length).toEqual(1);
    expect(root.queryAllByTestId('modal-content').length).toEqual(1);
  });

  it('Should call onClose callback on close button click', () => {
    const onClose = jest.fn();
    const root = render(<Modal onClose={onClose} isVisible title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    const modalCloseButton = root.getByTestId('modal-close-button');

    fireEvent.click(modalCloseButton);
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('Should NOT call onClose callback on escape when closeOnEscape is NOT set', () => {
    const onClose = jest.fn();
    const { container } = render(<Modal onClose={onClose} isVisible closeOnEscape={false} title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    fireEvent.keyDown(container, { key: 'Escape' });
    expect(onClose.mock.calls.length).toBe(0);
  });

  it('Should call onClose callback on background click when closeOnClickaway is set by default', () => {
    const onClose = jest.fn();
    const root = render(<Modal onClose={onClose} isVisible title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    const modalBackground = root.getByTestId('modal-background');

    fireEvent.click(modalBackground);
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('Should NOT call onClose callback on background click when closeOnClickaway is NOT set', () => {
    const onClose = jest.fn();
    const root = render(<Modal onClose={onClose} isVisible closeOnClickaway={false} title="test" />);

    expect(onClose.mock.calls.length).toBe(0);
    const modalBackground = root.getByTestId('modal-background');

    fireEvent.click(modalBackground);
    expect(onClose.mock.calls.length).toBe(0);
  });
});
