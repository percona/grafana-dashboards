import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  BarElement, CategoryScale, Chart as ChartJs, LinearScale, Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTheme2 } from '@grafana/ui';
import { BarChartProps } from './BarChart.types';
import { getStyles } from './BarChart.styles';
import { getDefaultOptions } from './BarChart.utils';

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartDataLabels,
);

export const BarChart: FC<BarChartProps> = ({
  data, options: customOptions, width, height, orientation, barWidth, showLegend,
}) => {
  const theme = useTheme2();
  const styles = getStyles(height);

  const options = getDefaultOptions({
    options: customOptions,
    orientation,
    barWidth,
    showLegend,
    theme,
  });

  return (
    <div className={styles.barCharWrapperOuter}>
      <div className={styles.barChartWrapperInner}>
        <Bar
          width={width}
          data={data}
          height={height}
          options={options}
          id="chart"
          redraw
        />
      </div>
    </div>
  );
};
