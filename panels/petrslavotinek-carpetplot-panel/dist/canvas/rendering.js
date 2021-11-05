'use strict';

System.register(['d3', 'lodash', 'moment', 'jquery', '../fragments', './tooltip', '../formatting', '../x-axis-label-formats', '../theme-provider', '../color-modes', '../color-spaces', '../libs/d3-scale-chromatic/index'], function (_export, _context) {
  "use strict";

  var d3, _, moment, $, getFragment, CarpetplotTooltip, valueFormatter, labelFormats, themeProvider, colorModes, interpolationMap, d3ScaleChromatic, _slicedToArray, DEFAULT_X_TICK_SIZE_PX, X_AXIS_TICK_MIN_SIZE, Y_AXIS_TICK_PADDING, Y_AXIS_TICK_MIN_SIZE, MIN_SELECTION_WIDTH, LEGEND_HEIGHT, LEGEND_TOP_MARGIN, DO_NOT_ROUND, ROUND_DECIMALS;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function link(scope, elem, attrs, ctrl) {
    var _colorScales;

    var data = void 0,
        panel = void 0,
        timeRange = void 0,
        carpet = void 0,
        canvas = void 0,
        context = void 0;

    var $carpet = elem.find('.carpetplot-panel');
    var tooltip = new CarpetplotTooltip($carpet, scope);

    var margin = { left: 25, right: 15, top: 10, bottom: 10 };

    var width = void 0,
        height = void 0,
        min = void 0,
        max = void 0,
        xFrom = void 0,
        xTo = void 0,
        days = void 0,
        chartHeight = void 0,
        chartWidth = void 0,
        chartTop = void 0,
        chartBottom = void 0,
        xAxisHeight = void 0,
        yAxisWidth = void 0,
        yScale = void 0,
        xScale = void 0,
        legendHeight = void 0,
        colorScale = void 0,
        fragment = void 0,
        mouseUpHandler = void 0,
        originalPointColor = void 0,
        pointWidth = void 0,
        pointHeight = void 0,
        pointWidthRounded = void 0,
        pointHeightRounded = void 0,
        highlightContainer = void 0,
        highlightedBucket = void 0,
        $canvas = void 0;

    var selection = {
      active: false,
      x1: -1,
      x2: -1
    };

    ctrl.events.on('render', function () {
      render();
      ctrl.renderingCompleted();
    });

    function addCarpetplot() {
      if (!data.data || !data.data[0]) {
        return;
      }

      var _getMinMax = getMinMax();

      var _getMinMax2 = _slicedToArray(_getMinMax, 2);

      min = _getMinMax2[0];
      max = _getMinMax2[1];

      colorScale = getColorScale(min, max);

      addCarpetplotSvg();
      addAxes();
      addLegend();
      addCanvas();
      addPoints();
      addHighlight();
    }

    function addCarpetplotSvg() {
      width = Math.floor($carpet.width());
      height = ctrl.height;

      if (carpet) {
        carpet.remove();
      }

      carpet = d3.select($carpet[0]).append('svg').attr('width', width).attr('height', height);
    }

    function addAxes() {
      legendHeight = panel.legend.show ? LEGEND_HEIGHT + LEGEND_TOP_MARGIN : 0;
      xAxisHeight = panel.xAxis.hideLabels ? 0 : getXAxisHeight();
      chartHeight = height - margin.top - margin.bottom - legendHeight - xAxisHeight;
      chartTop = margin.top;
      chartBottom = chartTop + chartHeight;

      addYAxis();
      yAxisWidth = panel.yAxis.hideLabels ? 0 : getYAxisWidth() + Y_AXIS_TICK_PADDING;
      chartWidth = width - yAxisWidth - margin.right;

      addXAxis();

      if (!panel.yAxis.show) {
        carpet.select('.axis-y').selectAll('line').style('opacity', 0);
      }

      if (!panel.xAxis.show) {
        carpet.select('.axis-x').selectAll('line').style('opacity', 0);
        carpet.selectAll('.axis-x-weekends').selectAll('line').style('opacity', 0);
      }
    }

    function addYAxis() {
      yScale = d3.scaleTime().domain([moment().startOf('day').add(1, 'day'), moment().startOf('day')]).range([chartHeight, 0]);

      var yAxis = d3.axisLeft(yScale).ticks(getYAxisTicks()).tickFormat(function (value) {
        return moment(value).format('HH:mm');
      }).tickSizeInner(0 - width).tickSizeOuter(0).tickPadding(Y_AXIS_TICK_PADDING);

      if (!panel.yAxis.hideLabels) {
        carpet.append('g').attr('class', 'axis axis-y').call(yAxis);

        var posY = margin.top;
        var posX = getYAxisWidth() + Y_AXIS_TICK_PADDING;

        var yAxisGroup = carpet.select('.axis-y');
        yAxisGroup.attr('transform', 'translate(' + posX + ',' + posY + ')');
        yAxisGroup.select('.domain').remove();
        yAxisGroup.select('.tick:first-child').remove();
        yAxisGroup.selectAll('.tick line').remove();
      }
    }

    function getYAxisWidth() {
      var axisText = carpet.selectAll('.axis-y text').nodes();
      return d3.max(axisText, function (text) {
        return text.getBBox().width;
      });
    }

    function getYAxisTicks() {
      var count = chartHeight / Y_AXIS_TICK_MIN_SIZE;
      var step = Math.max(2, Math.ceil(24 / count));
      return d3.timeHour.every(step);
    }

    function addXAxis() {
      xFrom = moment(data.data[0].time).startOf('day');
      xTo = moment(data.data[data.data.length - 1].time).startOf('day').add(1, 'day');
      days = xTo.diff(xFrom, 'days');

      xScale = d3.scaleTime().domain([xFrom, xTo]).range([0, chartWidth]);

      var xAxis = d3.axisBottom(xScale).ticks(getXAxisTicks(xFrom, xTo)).tickFormat(d3.timeFormat(panel.xAxis.labelFormat)).tickSize(chartHeight);

      var dayWidth = chartWidth / days;

      var posY = margin.top;
      var posX = yAxisWidth;

      if (!panel.xAxis.hideLabels) {
        carpet.append('g').attr('class', 'axis axis-x').attr('transform', 'translate(' + posX + ',' + posY + ')').call(xAxis).selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr('y', 0).attr('transform', 'translate(' + (5 + dayWidth / 2) + ',' + (posY + chartHeight - 10) + ') rotate(-65)');
        carpet.select('.axis-x').selectAll('.tick line, .domain').remove();
        carpet.select('.axis-x').select('.tick:last-child').remove();
      }

      if (panel.xAxis.showWeekends && dayWidth >= panel.xAxis.minBucketWidthToShowWeekends) {
        addDayTicks(posX, posY, d3.timeSaturday.every(1));
        addDayTicks(posX, posY, d3.timeMonday.every(1));
      }
    }

    function addDayTicks(posX, posY, range) {
      var ticks = d3.axisBottom(xScale).ticks(range).tickSize(chartHeight);
      carpet.append('g').attr('class', 'axis-x-weekends').attr('transform', 'translate(' + posX + ',' + posY + ')').call(ticks).selectAll('text').remove();
      carpet.select('.axis-x-weekends .domain').remove();
    }

    function getXAxisHeight() {
      return labelFormats.find(function (_ref) {
        var value = _ref.value;
        return value === panel.xAxis.labelFormat;
      }).height;
      // const axis = carpet.select('.axis-x');
      // if (!axis.empty()) {
      //   const totalHeight = $(axis.node()).height();
      //   return Math.max(totalHeight, totalHeight - chartHeight);
      // }
      // return 0;
    }

    function getXAxisTicks(from, to) {
      var count = chartWidth / X_AXIS_TICK_MIN_SIZE;
      var step = Math.ceil(days / count);
      if (step < 7) {
        return d3.timeDay.every(1);
      }
      if (step < 28) {
        return d3.timeMonday.every(1);
      }
      return d3.timeMonth.every(1);
    }

    function addHighlight() {
      highlightContainer = carpet.append('g').attr('class', 'points-highlight').attr('transform', 'translate(' + yAxisWidth + ',' + margin.top + ')');
    }

    function addCanvas() {
      if (canvas) {
        canvas.remove();
      }

      canvas = d3.select($carpet[0]).insert('canvas', ':first-child').attr('width', chartWidth).attr('height', chartHeight).style('left', yAxisWidth + 'px').style('top', margin.top + 'px');

      $canvas = $(canvas.node());

      context = canvas.node().getContext('2d');
    }

    function addPoints() {
      var customBase = document.createElement('custom');

      var container = d3.select(customBase);

      pointWidth = Math.max(0, chartWidth / days);
      pointWidthRounded = round(pointWidth);
      pointHeight = Math.max(0, chartHeight / fragment.count);
      pointHeightRounded = round(pointHeight);

      var pointScale = d3.scaleLinear().domain([fragment.count, 0]).range([chartHeight, 0]);

      var cols = container.selectAll('custom.carpet-col').data(data.data).enter().append('custom').attr('class', 'carpet-col');

      var points = cols.selectAll('custom.carpet-point').data(function (d, i) {
        return d.buckets.map(function (value) {
          return {
            value: value,
            time: d.time
          };
        });
      }).enter().append('custom').attr('class', 'carpet-point').attr('fillStyle', function (_ref2) {
        var value = _ref2.value;
        return value === null ? panel.color.nullColor : colorScale(value);
      }).attr('x', function (d) {
        return xScale(d.time.toDate());
      }).attr('y', function (d, i) {
        return pointScale(i);
      });

      drawPoints(cols);
    }

    function drawPoints(cols) {
      context.clearRect(0, 0, chartWidth, chartHeight);

      var elements = cols.selectAll('custom.carpet-point').each(function (d, i) {
        var node = d3.select(this);

        var color = node.attr('fillStyle');
        var x = round(node.attr('x'));
        var y = round(node.attr('y'));

        context.fillStyle = color;
        context.fillRect(x, y, pointWidthRounded, pointHeightRounded);
      });
    }

    function getMinMax() {
      var _panel = panel,
          _panel$scale = _panel.scale,
          min = _panel$scale.min,
          max = _panel$scale.max,
          mode = _panel.color.mode;

      var isSpectrumMode = mode === colorModes.SPECTRUM;
      return [isSpectrumMode && isSet(min) ? min : data.stats.min, isSpectrumMode && isSet(max) ? max : data.stats.max];
    }

    var colorScales = (_colorScales = {}, _defineProperty(_colorScales, colorModes.SPECTRUM, getColorScaleSpectrum), _defineProperty(_colorScales, colorModes.CUSTOM, getColorScaleCustom), _colorScales);

    function getColorScale(min, max) {
      return colorScales[panel.color.mode](min, max);
    }

    function getColorScaleSpectrum(min, max) {
      var theme = themeProvider.getTheme();
      var colorScheme = _.find(ctrl.colorSchemes, { value: panel.color.colorScheme });
      var colorInterpolator = d3ScaleChromatic[colorScheme.value];
      var invert = colorScheme.invert === 'always' || colorScheme.invert === 'dark' && theme === 'dark';
      var domain = getStartEnd(min, max, invert);

      return d3.scaleSequential(colorInterpolator).domain(domain);
    }

    function getColorScaleCustom(min, max) {
      var domain = [];

      var colors = panel.color.customColors.map(function (color) {
        return color.color;
      });
      var interpolator = interpolationMap[panel.color.colorSpace];

      var breakpoints = panel.color.customColors.map(function (color) {
        return color.breakpoint;
      });
      var firstBreakpoint = breakpoints.find(function (breakpoint) {
        return isDefined(breakpoint);
      });
      if (isDefined(firstBreakpoint)) {
        // transform breakpoints
        var last = 0;

        var fill = function fill(i, value) {
          var step = (value - domain[last]) / (i - last);
          d3.range(i - last - 1).forEach(function (d, j) {
            domain[last + j + 1] = domain[last] + (j + 1) * step;
            // setDomainValue(last + j + 1, domain[last] + (j + 1) * step);
          });
        };

        for (var i = 0; i < breakpoints.length; i++) {
          if (!isDefined(breakpoints[i])) {
            // !set
            if (i === 0) {
              // color first
              domain[i] = Math.min(min, firstBreakpoint < min ? -Number.MAX_VALUE : firstBreakpoint);
              // setDomainValue(i, Math.min(min, firstBreakpoint));
            } else if (i === breakpoints.length - 1) {
              // color last
              var maxVal = Math.max(max, domain[last]);
              fill(i, maxVal);
              domain[i] = maxVal;
              // setDomainValue(i, maxVal);
            }
          } else if (i === 0) {
            // set && color first
            domain[i] = breakpoints[i];
            // setDomainValue(i, breakpoints[i]);
          } else {
            // set && color 2..N
            if (breakpoints[i] >= domain[last]) {
              // valid breakpoint
              fill(i, breakpoints[i]);
              domain[i] = breakpoints[i];
              // setDomainValue(i, breakpoints[i]);
              last = i;
            }
          }
        }
      } else {
        var _getStartEnd = getStartEnd(min, max),
            _getStartEnd2 = _slicedToArray(_getStartEnd, 2),
            start = _getStartEnd2[0],
            end = _getStartEnd2[1];

        var step = (end - start) / (colors.length - 1);
        domain = d3.range(colors.length).map(function (d, i) {
          return start + i * step;
        });
      }

      if (domain[0] > min) {
        domain.unshift(min);
        colors.unshift(colors[0]);
      }

      if (domain[domain.length - 1] < max) {
        domain.push(max);
        colors.push(colors[colors.length - 1]);
      }

      return d3.scaleLinear().domain(domain).range(colors).interpolate(interpolator);
    }

    function isDefined(value) {
      return value !== undefined && value !== null;
    }

    function getStartEnd(min, max) {
      var invert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      invert = panel.color.invert ? !invert : invert;
      return [invert ? max : min, invert ? min : max];
    }

    function isSet(prop) {
      return prop !== undefined && prop !== null && prop !== '';
    }

    function onMouseDown(event) {
      var pos = getMousePos(event);
      if (!isInChart(pos)) {
        return;
      }

      selection.active = true;
      selection.x1 = pos.x;

      mouseUpHandler = function mouseUpHandler() {
        return onMouseUp();
      };

      $(document).one('mouseup', mouseUpHandler);
    }

    function onMouseUp() {
      $(document).unbind('mouseup', mouseUpHandler);
      mouseUpHandler = null;
      selection.active = false;

      var selectionRange = Math.abs(selection.x2 - selection.x1);

      if (selection.x2 >= 0 && selectionRange > MIN_SELECTION_WIDTH) {
        var timeFrom = moment(xScale.invert(Math.min(selection.x1, selection.x2))).startOf('day');
        var timeTo = moment(xScale.invert(Math.max(selection.x1, selection.x2))).startOf('day').add(1, 'day');

        ctrl.timeSrv.setTime({
          from: moment.utc(timeFrom),
          to: moment.utc(timeTo)
        });
      }

      clearSelection();
    }

    function onMouseLeave() {
      clearCrosshair();
    }

    function onMouseMove(event) {
      if (!carpet) {
        return;
      }

      var pos = getMousePos(event);

      if (selection.active) {
        clearCrosshair();
        tooltip.destroy();

        selection.x2 = pos.x;
        drawSelection(selection.x1, selection.x2);
      } else {
        drawCrosshair(pos);

        var bucket = getBucket(pos);
        tooltip.show(pos, bucket);
        highlightPoint(pos, bucket);
      }
    }

    function highlightPoint(pos, bucket) {
      if (!isInChart(pos) || !bucket || !bucket.hasValue()) {
        resetPointHighLight();
        return;
      }

      if (bucket.equals(highlightedBucket)) {
        return;
      } else {
        resetPointHighLight();
      }

      highlightedBucket = bucket;

      var value = bucket.value,
          x = bucket.xRounded,
          y = bucket.yRounded;


      var color = colorScale(value);
      var highlightColor = d3.color(color).darker(1);
      originalPointColor = color;

      highlightContainer.append('rect').attr('x', x).attr('y', y).attr('width', pointWidthRounded).attr('height', pointHeightRounded).attr('fill', highlightColor);
    }

    function resetPointHighLight() {
      if (!highlightedBucket) {
        return;
      }

      highlightContainer.select('rect').remove();

      highlightedBucket = null;
    }

    function getMousePos(event) {
      var _$canvas$0$getBoundin = $canvas[0].getBoundingClientRect(),
          left = _$canvas$0$getBoundin.left,
          top = _$canvas$0$getBoundin.top;

      var pageX = event.pageX,
          pageY = event.pageY;

      var pos = {
        x: pageX - window.pageXOffset - left,
        y: pageY - window.pageYOffset - top,
        pageX: pageX,
        pageY: pageY
      };
      return pos;
    }

    function drawCrosshair(pos) {
      if (!carpet || !isInChart(pos)) {
        clearCrosshair();
        return;
      }

      carpet.selectAll('.heatmap-crosshair').remove();

      var x = pos.x + yAxisWidth;
      var y = pos.y + chartTop;

      var crosshair = carpet.append('g').attr('class', 'heatmap-crosshair');

      if (panel.xAxis.showCrosshair) {
        crosshair.append('line').attr('x1', x).attr('y1', chartTop).attr('x2', x).attr('y2', chartBottom).attr('stroke-width', 1);
      }

      if (panel.yAxis.showCrosshair) {
        crosshair.append('line').attr('x1', yAxisWidth).attr('y1', y).attr('x2', yAxisWidth + chartWidth).attr('y2', y).attr('stroke-width', 1);
      }
    }

    function clearCrosshair() {
      if (!carpet) {
        return;
      }

      carpet.selectAll('.heatmap-crosshair').remove();
    }

    function drawSelection(posX1, posX2) {
      if (!carpet) {
        return;
      }

      carpet.selectAll('.carpet-selection').remove();
      var selectionX = Math.min(posX1, posX2) + yAxisWidth;
      var selectionWidth = Math.abs(posX1 - posX2);

      if (selectionWidth > MIN_SELECTION_WIDTH) {
        carpet.append('rect').attr('class', 'carpet-selection').attr('x', selectionX).attr('width', selectionWidth).attr('y', chartTop).attr('height', chartHeight);
      }
    }

    function clearSelection() {
      selection.x1 = -1;
      selection.x2 = -1;

      if (!carpet) {
        return;
      }

      carpet.selectAll('.carpet-selection').remove();
    }

    function drawColorLegend() {
      if (!colorScale) {
        return;
      }
      d3.select("#heatmap-color-legend").selectAll("rect").remove();

      var legend = d3.select("#heatmap-color-legend");
      var legendWidth = Math.floor($(d3.select("#heatmap-color-legend").node()).outerWidth());
      var legendHeight = d3.select("#heatmap-color-legend").attr("height");

      drawLegend(legend, legendWidth, legendHeight);
    }

    function addLegend() {
      if (!panel.legend.show) {
        return;
      }

      var decimals = panel.data.decimals;
      var format = panel.data.unitFormat;
      var formatter = valueFormatter(format, decimals);

      var legendY = yAxisWidth;
      var legendX = margin.top + chartHeight + xAxisHeight + LEGEND_TOP_MARGIN;

      var legendContainer = carpet.append('g').attr('class', 'carpet-legend').attr('transform', 'translate(' + legendY + ',' + legendX + ')');

      var legendHeight = LEGEND_HEIGHT / 2;
      var labelMargin = 5;

      var minLabel = createMinMaxLabel(legendContainer, formatter(min));
      var maxLabel = createMinMaxLabel(legendContainer, formatter(max));
      var minLabelBox = minLabel.node().getBBox();
      var maxLabelBox = maxLabel.node().getBBox();

      var labelHeight = Math.ceil(Math.max(minLabelBox.height, maxLabelBox.height));
      var labelWidth = Math.ceil(Math.max(minLabelBox.width, maxLabelBox.width));
      var legendMargin = labelWidth + 2 * labelMargin;
      var labelY = (legendHeight - labelHeight + 8) / 2;

      minLabel.attr('x', legendMargin / 2).attr('y', labelY);
      maxLabel.attr('x', chartWidth - legendMargin / 2).attr('y', labelY);

      var legend = legendContainer.append('g').attr('transform', 'translate(' + legendMargin + ',0)');

      var legendWidth = chartWidth - 2 * legendMargin;
      drawLegend(legend, legendWidth, legendHeight);

      var legendScale = d3.scaleLinear().domain([min, max]).range([0, legendWidth]);

      var legendAxis = d3.axisBottom(legendScale).ticks(20).tickFormat(formatter).tickSize(legendHeight);

      legendContainer.append('g').attr('class', 'legend-axis').call(legendAxis).attr('transform', 'translate(' + legendMargin + ',0)').select('.domain').remove();
    }

    function createMinMaxLabel(legendContainer, text) {
      return legendContainer.append('text').attr('class', 'min-max-label').attr('y', 0).attr('x', 0).attr('dy', '0.71em').attr('text-anchor', 'middle').text(text);
    }

    function drawLegend(legend, legendWidth, legendHeight) {
      var rangeStep = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 2;

      var legendColorScale = getColorScale(0, legendWidth, min, max);
      var positionRange = d3.range(0, legendWidth, rangeStep);

      var valueScale = d3.scaleLinear().domain([0, legendWidth]).range([min, max]);

      return legend.selectAll(".heatmap-color-legend-rect").data(positionRange).enter().append("rect").attr("x", function (d) {
        return d;
      }).attr("y", 0).attr("width", rangeStep + 1) // Overlap rectangles to prevent gaps
      .attr("height", legendHeight).attr("stroke-width", 0).attr("fill", function (d) {
        return colorScale(valueScale(d));
      });
    }

    // Helpers

    function isInChart(pos) {
      var x = pos.x,
          y = pos.y;


      return x > 0 && x < chartWidth && y > 0 && y < chartHeight;
    }

    function getBucket(pos) {
      var x = pos.x,
          y = pos.y;


      var xTime = moment(xScale.invert(x)).startOf('day');
      var yTime = moment(yScale.invert(y));

      var dayIndex = xTime.diff(xFrom, 'days');
      var bucketIndex = fragment.getBucketIndex(yTime);

      var bucketX = xScale(xTime.toDate());
      var bucketY = pointHeight * bucketIndex;

      return _.has(data, 'data[' + dayIndex + '].buckets[' + bucketIndex + ']') ? {
        x: bucketX,
        y: bucketY,
        xRounded: round(bucketX),
        yRounded: round(bucketY),
        time: fragment.getTime(data.data[dayIndex].time, bucketIndex),
        value: data.data[dayIndex].buckets[bucketIndex],
        hasValue: function hasValue() {
          return this.value !== null;
        },
        equals: function equals(bucket) {
          return bucket && bucket.x === this.x && bucket.y === this.y;
        }
      } : null;
    }

    function hasData() {
      return data && data.data;
    }

    function round(value) {
      var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ROUND_DECIMALS;

      if (decimals === DO_NOT_ROUND) {
        return value;
      }
      if (!decimals) {
        return Math.round(value);
      }
      var mul = Math.pow(10, decimals);
      return Math.round(value * mul) / mul;
    }

    // Render

    function render() {
      data = ctrl.data;
      panel = ctrl.panel;
      timeRange = ctrl.range;

      fragment = getFragment(panel.fragment);

      addCarpetplot();

      if (!d3.select("#heatmap-color-legend").empty()) {
        drawColorLegend();
      }

      scope.hasData = hasData;
      scope.isInChart = isInChart;
    }

    $carpet.on('mousedown', onMouseDown);
    $carpet.on('mousemove', onMouseMove);
    $carpet.on('mouseleave', onMouseLeave);
  }

  _export('default', link);

  return {
    setters: [function (_d2) {
      d3 = _d2.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_fragments) {
      getFragment = _fragments.getFragment;
    }, function (_tooltip) {
      CarpetplotTooltip = _tooltip.default;
    }, function (_formatting) {
      valueFormatter = _formatting.valueFormatter;
    }, function (_xAxisLabelFormats) {
      labelFormats = _xAxisLabelFormats.labelFormats;
    }, function (_themeProvider) {
      themeProvider = _themeProvider.default;
    }, function (_colorModes) {
      colorModes = _colorModes.default;
    }, function (_colorSpaces) {
      interpolationMap = _colorSpaces.interpolationMap;
    }, function (_libsD3ScaleChromaticIndex) {
      d3ScaleChromatic = _libsD3ScaleChromaticIndex;
    }],
    execute: function () {
      _slicedToArray = function () {
        function sliceIterator(arr, i) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"]) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        return function (arr, i) {
          if (Array.isArray(arr)) {
            return arr;
          } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
          } else {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
          }
        };
      }();

      DEFAULT_X_TICK_SIZE_PX = 100;
      X_AXIS_TICK_MIN_SIZE = 100;
      Y_AXIS_TICK_PADDING = 5;
      Y_AXIS_TICK_MIN_SIZE = 20;
      MIN_SELECTION_WIDTH = 2;
      LEGEND_HEIGHT = 40;
      LEGEND_TOP_MARGIN = 10;
      DO_NOT_ROUND = 'DO_NOT_DOUND';
      ROUND_DECIMALS = DO_NOT_ROUND;
    }
  };
});
//# sourceMappingURL=rendering.js.map
