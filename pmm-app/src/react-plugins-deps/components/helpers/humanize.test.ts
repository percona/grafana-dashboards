import Humanize from './humanize';
describe('Humanize module', () => {
  it('should return <0.01', () => {
    expect(Humanize.formatPercent(0.00001)).toBe('<0.01');
  });

  it('should return 100%', () => {
    expect(Humanize.formatPercent(1)).toBe('100%');
  });

  xit('should return 21.5%', () => {
    expect(Humanize.formatPercent(21.575)).toBe('21.5%');
  });
});
