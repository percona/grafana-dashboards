import Humanize from './humanize';
describe('Humanize module', function() {
  it('should return <0.01', function() {
    expect(Humanize.formatPercent(0.00001)).toBe('<0.01');
  });

  it('should return 100%', function() {
    expect(Humanize.formatPercent(1)).toBe('100%');
  });

  xit('should return 21.5%', function() {
    expect(Humanize.formatPercent(21.575)).toBe('21.5%');
  });
});
