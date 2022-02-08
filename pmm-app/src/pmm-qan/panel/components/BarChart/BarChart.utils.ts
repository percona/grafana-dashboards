import { ChartOptions } from 'chart.js';
import { GetDefaultOptionsProps } from './BarChart.types';

export const getDefaultOptions = ({
  options, orientation, barWidth, showLegend, theme,
}: GetDefaultOptionsProps): ChartOptions<'bar'> => {
  const indexAxis: 'x'|'y'| undefined = orientation && orientation === 'horizontal' ? 'y' : 'x';

  const defaultOptions = {
    indexAxis,
    responsive: true,
    maintainAspectRatio: false,
    barThickness: barWidth || 'flex',
    legend: {
      display: showLegend,
    },
    animation: false as const,
    plugins: {
      datalabels: {
        color: theme.colors.text,
        anchor: 'end' as const,
        align: 'end' as const,
        formatter(_value, context) {
          const data = context.dataset.dataInPersent[context.dataIndex];

          return data ? `${data}%` : '';
        },
      },
      tooltip: {
        filter(tooltipItem) {
          return !!tooltipItem.formattedValue;
        },
        callbacks: {
          title() {
            return '';
          },
          label(context) {
            return context.formattedValue || '';
          },
          labelTextColor() {
            return theme.colors.text;
          },
        },
        backgroundColor: theme.colors.bg2,
        displayColors: false,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
    },
    resize: true,
    onResize(chart) {
      chart.update();
    },
  };

  return options ? {
    ...defaultOptions,
    ...options,
  } : defaultOptions;
};
