import React, {
  MutableRefObject, RefObject, useEffect, useRef, useState,
} from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import { v4 as uuidv4 } from 'uuid';
import { scaleLinear } from 'd3';
import moment from 'moment';
import { humanize } from '../../../helpers/Humanization';
import { PolygonChartInterface } from './Sparkline.types';
import {
  findXRange, findYRange, getAdditionalPoint, getMetricSparklineKey, isMetricExists,
} from './Sparkline.tools';
import { styles } from './Sparkline.styles';

const updateGraphs = (columnNumber) => {
  const event = new CustomEvent('sync-graphs', { detail: columnNumber });

  document.dispatchEvent(event);
};

const BAR_HEIGHT = 30;
const GRAPH_WIDTH = 300;

export const Sparkline = ({
  margin = 0,
  width = GRAPH_WIDTH,
  height = BAR_HEIGHT,
  metricName,
  data,
  color = '#d0c38b',
}: PolygonChartInterface) => {
  const [tooltip, setTooltip] = useState('');

  const xkey = 'timestamp';
  const ykey = getMetricSparklineKey(metricName);
  let appLoadPolygonChart = [...data] || [];

  if (appLoadPolygonChart.length > 2) {
    appLoadPolygonChart.push({
      point: appLoadPolygonChart[appLoadPolygonChart.length - 1].point + 1,
      timestamp: getAdditionalPoint(
        appLoadPolygonChart[appLoadPolygonChart.length - 1].timestamp,
        appLoadPolygonChart[appLoadPolygonChart.length - 2].timestamp,
      ),
    });
  }

  appLoadPolygonChart = appLoadPolygonChart.sort((a, b) => {
    if (a.point === undefined) {
      return 1;
    }

    if (b.point === undefined) {
      return -1;
    }

    return b.point - a.point;
  });

  const xAxisLength = width - 2 * margin;
  const yAxisLength = height - 2 * margin;

  const [maxX, minX] = findXRange(appLoadPolygonChart, xkey);
  const scaleX = scaleLinear()
    .domain([minX, maxX])
    .range([0, xAxisLength]);

  const [maxY, minY] = findYRange(appLoadPolygonChart, ykey);
  const scaleY = scaleLinear()
    .domain([maxY, minY])
    .range([0, yAxisLength]);

  const drawData = appLoadPolygonChart.map((item) => ({
    x: scaleX(moment.utc(item.timestamp)),
    y: scaleY(isMetricExists(item[ykey]) ? 0 : Math.max(maxY / 15, item[ykey])),
  }));

  const sparklineCanvas: MutableRefObject<HTMLCanvasElement | undefined> = useRef();

  useEffect(() => {
    if (!sparklineCanvas.current) {
      return;
    }

    const ctx = sparklineCanvas.current.getContext('2d') as CanvasRenderingContext2D;

    const drawBar = (barIndex: number, color: string, minHeight?: boolean): void => {
      ctx.fillStyle = color;
      const height = drawData[barIndex].y;
      const offsetX = drawData[barIndex].x;
      const width = drawData[barIndex - 1]
        ? drawData[barIndex].x - drawData[barIndex - 1].x
        : GRAPH_WIDTH / drawData.length;

      ctx.fillRect(
        offsetX,
        minHeight ? Math.min(BAR_HEIGHT - 2, height) : height,
        width,
        minHeight ? 30 : BAR_HEIGHT - height,
      );
    };

    const createTooltip = (columnNumber) => {
      const value = isMetricExists(appLoadPolygonChart[columnNumber][ykey])
        ? 0
        : appLoadPolygonChart[columnNumber][ykey];
      const dateToShow = moment(appLoadPolygonChart[columnNumber][xkey]).format('YYYY-MM-DD HH:mm:ss');

      // eslint-disable-next-line max-len
      const isTimeBased = metricName.endsWith('_time') || metricName.endsWith('_wait') || metricName === 'load';
      const load = humanize.transform(value, 'number');

      return !value ? `NA at ${dateToShow}` : `${load} ${isTimeBased ? '' : '/ sec'} at ${dateToShow}`;
    };

    sparklineCanvas.current.addEventListener('mousemove', (e) => {
      const columnNumber = Math.floor(e.offsetX / (GRAPH_WIDTH / (drawData.length - 1)));

      setTooltip(createTooltip(columnNumber));

      updateGraphs(columnNumber);

      ctx.clearRect(0, 0, 300, 30);
      drawData.forEach((_, index) => {
        drawBar(index, color);
      });

      drawBar(columnNumber, 'white', true);
    });

    sparklineCanvas.current.addEventListener('mouseout', () => {
      updateGraphs(NaN);
      ctx.clearRect(0, 0, 300, 30);
      drawData.forEach((_, index) => {
        drawBar(index, color);
      });
    });

    // TODO: code for zoom feature
    // sparklineCanvas.current.addEventListener('mousedown', (e) => {
    //   const startPoint = e.offsetX;
    //   let endPoint = null;
    //
    //   e.stopPropagation();
    //   const mouseUpHandler = (e) => {
    //     ctx.clearRect(startPoint, 0, endPoint - startPoint, BAR_HEIGHT);
    //
    //     const start = Math.floor(startPoint / (GRAPH_WIDTH / drawData.length));
    //     const end = Math.floor(endPoint / (GRAPH_WIDTH / drawData.length));
    //
    //     const result = [appLoadPolygonChart[start], appLoadPolygonChart[end]]
    //       .sort((a, b) => b.point - a.point)
    //       .map((item) => item.timestamp);
    //
    //     console.log(result);
    //     e.stopPropagation();
    //     sparklineCanvas.current.removeEventListener('mouseup', mouseUpHandler);
    //     sparklineCanvas.current.removeEventListener('mouseup', mouseMove);
    //   };
    //   const mouseMove = (e) => {
    //     endPoint = e.offsetX;
    //
    //     // ctx.fillStyle = "rgba(150,150,150,0.3)";
    //     // const height = drawData[barIndex].y;
    //     // ctx.fillRect(startPoint, 0, endPoint - startPoint, BAR_HEIGHT);
    //
    //     e.stopPropagation();
    //   };
    //
    //   sparklineCanvas.current.addEventListemer('mouseup', mouseUpHandler);
    //   sparklineCanvas.current.addEventListener('mousemove', mouseMove);
    // });
    ctx.clearRect(0, 0, 300, 30);
    drawData.forEach((_, index) => {
      drawBar(index, color);
    });

    const drawHighlighted = (e) => {
      ctx.clearRect(0, 0, 300, 30);
      drawData.forEach((_, index) => drawBar(index, color));

      if (!e.detail) {
        return;
      }

      const columnNumber = e.detail;

      drawBar(columnNumber, '#00e6e6');
    };

    document.addEventListener('sync-graphs', drawHighlighted, false);

    // eslint-disable-next-line consistent-return
    return () => document.removeEventListener('sync-graphs', drawHighlighted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sparklineCanvas]);

  const id = uuidv4();

  return (
    <Tippy delay={[100, 100]} className={styles.tippy} content={tooltip} followCursor="horizontal" plugins={[followCursor]} placement="bottom">
      <canvas
        ref={sparklineCanvas as RefObject<any>}
        className={styles.graphWrapper}
        width={GRAPH_WIDTH}
        height={BAR_HEIGHT}
        data-tip=""
        data-for={`sparkline-tooltip-${id}`}
      />
    </Tippy>
  );
};
