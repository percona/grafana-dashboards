import mermaid from './libs/mermaid/dist/mermaid';
import d3 from './libs/d3/dist/d3.min';
import TimeSeries from 'app/core/time_series2';
import kbn from 'app/core/utils/kbn';
import {
  MetricsPanelCtrl
} from 'app/plugins/sdk';
import {
  diagramEditor,
  displayEditor,
  compositeEditor,
  mappingEditor
} from './properties';
import _ from 'lodash';
import './series_overrides_diagram_ctrl';
//import './css/diagram.css!';

// Work In Progress
// Build a custom style editor
import { diagramStyleFormatter } from './diagramStyle';

const mermaidAPI = mermaid.mermaidAPI;

const panelDefaults = {
  composites: [],
  metricCharacterReplacements: [],
  // other style overrides
  seriesOverrides: [],
  thresholds: '0,10',
  decimals: 2, // decimal precision
  colors: ['rgba(50, 172, 45, 0.97)', 'rgba(237, 129, 40, 0.89)', 'rgba(245, 54, 54, 0.9)'],
  styleValues: {},
  style: '',
  legend: {
    show: true,
    min: true,
    max: true,
    avg: true,
    current: true,
    total: true,
    gradient: {
      enabled: true,
      show: true
    }
  },
  maxDataPoints: 100,
  mappingType: 1,
  maxWidth: false,
  nullPointMode: 'connected',
  moddedSeriesVal: 0,
  format: 'none',
  valueName: 'avg',
  valueOptions: ['avg', 'min', 'max', 'total', 'current'],
  valueMaps: [{
    value: 'null',
    op: '=',
    text: 'N/A'
  }],
  mappingTypes: [
    {name: 'value to text', value: 1},
    {name: 'range to text', value: 2},
  ],
  content: 'graph LR\n' +
    'A[Square Rect] -- Link text --> B((Circle))\n' +
    'A --> C(Round Rect)\n' +
    'B --> D{Rhombus}\n' +
    'C --> D\n',
  mode: 'content', //allowed values: 'content' and 'url'
  mermaidServiceUrl: '',
  themes: ['default', 'dark', 'forest', 'neutral'],
  init: {
    theme: 'dark',
    securityLevel: 'loose',
    logLevel: 3, //1:debug, 2:info, 3:warn, 4:error, 5:fatal
    cloneCssStyles: true, // - This options controls whether or not the css rules should be copied into the generated svg
    startOnLoad: false, // - This options controls whether or mermaid starts when the page loads
    arrowMarkerAbsolute: true, // - This options controls whether or arrow markers in html code will be absolute paths or an anchor, #. This matters if you are using base tag settings.
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true
    },
    sequence: {
      diagramMarginX: 50, // - margin to the right and left of the sequence diagram
      diagramMarginY: 10, // - margin to the over and under the sequence diagram
      actorMargin: 50, // - Margin between actors
      width: 150, // - Width of actor boxes
      height: 65, // - Height of actor boxes00000000001111
      boxMargin: 10, // - Margin around l01oop boxes
      boxTextMargin: 5, // - margin around the text in loop/alt/opt boxes
      noteMargin: 10, // - margin around notes
      messageMargin: 35, // - Space between messages
      mirrorActors: true, // - mirror actors under diagram
      bottomMarginAdj: 1, // - Depending on css styling this might need adjustment. Prolongs the edge of the diagram downwards
      useMaxWidth: true, // - when this flag is set the height and width is set to 100% and is then scaling with the available space if not the absolute space required is used
    },
    gantt: {
      titleTopMargin: 25, // - margin top for the text over the gantt diagram
      barHeight: 20, // - the height of the bars in the graph
      barGap: 4, // - the margin between the different activities in the gantt diagram
      topPadding: 50, // - margin between title and gantt diagram and between axis and gantt diagram.
      leftPadding: 75, // - the space allocated for the section name to the left of the activities.
      gridLineStartPadding: 35, // - Vertical starting position of the grid lines
      fontSize: 11, // - font size ...
      fontFamily: '"Open-Sans", "sans-serif"', // - font family ...
      numberSectionStyles: 3, // - the number of alternating section styles
      /** axisFormatter: // - formatting of the axis, this might need adjustment to match your locale and preferences
				[
		        // Within a day
		        ['%I:%M', function (d) {
		            return d.getHours();
		        }],
		        // Monday a week
		        ['w. %U', function (d) {
		            return d.getDay() == 1;
		        }],
		        // Day within a week (not monday)
		        ['%a %d', function (d) {
		            return d.getDay() && d.getDate() != 1;
		        }],
		        // within a month
		        ['%b %d', function (d) {
		            return d.getDate() != 1;
		        }],
		        // Month
		        ['%m-%y', function (d) {
		            return d.getMonth();
		        }]] **/
    },
    //classDiagram: {},
    //info: {}
  }
};

class DiagramCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $sce, $http) {
    super($scope, $injector);
    _.defaults(this.panel, panelDefaults);
    this.$http = $http;
    this.panel.graphId = 'diagram_' + this.panel.id;
    this.containerDivId = 'container_' + this.panel.graphId;
    this.$sce = $sce;
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.unitFormats = kbn.getUnitFormats();
    this.initializeMermaid();
  }

  initializeMermaid() {
    mermaidAPI.initialize(this.panel.init);
    mermaidAPI.parseError = this.handleParseError.bind(this);
  }

  changeTheme(){
    this.initializeMermaid();
    this.updateDiagram(this.svgData);
  }

  handleParseError(err, hash) {
    this.error = 'Failed to parse diagram definition';
    this.errorText = this.$sce.trustAsHtml('<p>Diagram Definition:</p><pre>' + err + '</pre>');
  }

  onInitEditMode() {
    this.addEditorTab('Diagram', diagramEditor, 2);
    this.addEditorTab('Display', displayEditor, 3);
    this.addEditorTab('Metric Composites', compositeEditor, 4);
    this.addEditorTab('Value Mappings', mappingEditor, 5);
  }

  getDiagramContainer() {
    return $(document.getElementById(this.containerDivId));
  }

  onDataReceived(dataList) {
    console.debug('received data');
    console.debug(dataList);
    this.series = dataList.map(this.seriesHandler.bind(this));
    console.debug('mapped dataList to series');
    console.debug(this.series);
    var data = this.setValues();
    // this update works for local diagrams, if the url method is used the data has to be stored in the callback
    this.svgData = data;
    this.updateDiagram(data);
    this.render();
  }

  replaceMetricCharacters(metricName) {
    // a datasource sending bad data will have a type other than string, set it to "MISSING_METRIC_TARGET" and return
    if (typeof metricName !== 'string') return "DATASOURCE_SENT_INVALID_METRIC_TARGET";
    var replacedText = metricName.replace(/"|,|;|=|:|{|}/g, '_');
    for (var index in this.panel.metricCharacterReplacements) {
      var replacement = this.panel.metricCharacterReplacements[index];
      // start with a simple replacement
      var pattern = replacement.replacementPattern;
      // check if the pattern is empty
      if (pattern.length === 0) continue;
      // if it is a regex, convert
      if (pattern[0] === '/') {
        pattern = kbn.stringToJsRegex(replacement.replacementPattern);
      }
      replacedText = replacedText.replace(
        pattern,
        replacement.replaceWithText
      );
    }
    return replacedText;
  }

  seriesHandler(seriesData) {
    var alias = this.replaceMetricCharacters(seriesData.target);
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: alias,
      unit: seriesData.unit
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    var datapoints = seriesData.datapoints || [];
    if (datapoints && datapoints.length > 0) {
      var last = datapoints[datapoints.length - 1][1];
      var from = this.range.from;
      if (last - from < -10000) {
        series.isOutsideRange = true;
      }
    }
    return series;
  } // End seriesHandler()

  addSeriesOverride(override) {
    this.panel.seriesOverrides.push(override || {});
  }

  removeSeriesOverride(override) {
    this.panel.seriesOverrides = _.without(this.panel.seriesOverrides, override);
    this.refresh();
  }

  addComposite(composite) {
    this.panel.composites.push(composite || {});
  }
  removeComposite(composite) {
    this.panel.composites = _.without(this.panel.composites, composite);
    this.refresh();
  }
  getSeriesNamesForComposites() {
    return _.map(this.$scope.ctrl.series, function(series) {
      return series.alias;
    });
  }

  addMetricToComposite(composite) {
    if (composite.metrics === undefined) {
      composite.metrics = [{}];
    } else {
      composite.metrics.push({});
    }
    this.refresh();
  }
  removeMetricFromComposite(composite, metric) {
    composite.metrics = _.without(composite.metrics, metric);
    this.refresh();
  }

  addMetricCharacterReplacement(replacement) {
    this.panel.metricCharacterReplacements.push(replacement || {
      replacementPattern: '',
      replaceWithText: '_'
    });
  }
  removeMetricCharacterReplacement(replacement) {
    this.panel.metricCharacterReplacements = _.without(this.panel.metricCharacterReplacements, replacement);
    this.refresh();
  }

  addValueMapping(mapping) {
    this.panel.valueMaps.push(mapping || {});
  }

  removeValueMapping(mapping) {
    this.panel.valueMaps = _.without(this.panel.valueMaps, mapping);
  }

  addEntryToValueMapping(mapping) {
    if (mapping.type == 1) {
      if (mapping.valueToText === undefined) {
        mapping.valueToText = [{}];
      } else {
        mapping.valueToText.push({});
      }
    } else if (mapping.type == 2) {
      if (mapping.rangeToText === undefined) {
        mapping.rangeToText = [{}];
      } else {
        mapping.rangeToText.push({});
      }
    }
  }

  removeEntryFromValueMapping(valueMap, mapping) {
    if (valueMap.type == 1) {
      valueMap.valueToText = _.without(valueMap.valueToText, mapping);
    } else if (valueMap.type == 2) {
      valueMap.rangeToText = _.without(valueMap.rangeToText, mapping);
    }
  }
  
  updateThresholds() {
    var thresholdCount = this.panel.thresholds.length;
    var colorCount = this.panel.colors.length;
    this.refresh();
  }

  changeColor(colorIndex, color) {
    this.panel.colors[colorIndex] = color;
  }

  removeColor(colorIndex) {
    this.panel.colors.splice(colorIndex, 1);
  }

  addColor() {
    this.panel.colors.push('rgba(255, 255, 255, 1)');
  }

  setUnitFormat(subItem) {
    this.panel.format = subItem.value;
    this.refresh();
  }

  clearDiagram() {
    if ($('#'+this.panel.graphId).length) {
      $('#' + this.panel.graphId).remove();
    }
    this.svg = {};
  }

  renderDiagram(graphDefinition, data) {
    // substitute values inside "link text"
    // this will look for any composite prefixed with a # and substitute the value of the composite
    // if a series alias is found, in the form #alias, the value will be substituted
    // this allows link values to be displayed based on the metric
    graphDefinition = this.substituteHashPrefixedNotation(graphDefinition, data);
    graphDefinition = this.templateSrv.replaceWithText(graphDefinition);
    var diagramContainer = $(document.getElementById(this.containerDivId));
    var _this = this;
    var renderCallback = function(svgCode, bindFunctions) {
      if (svgCode === '') {
        diagramContainer.html('<p>There was a problem rendering the graph</p>');
      } else {
        diagramContainer.html(svgCode);
        if (bindFunctions) {
          bindFunctions(diagramContainer[0]);
        }
        console.debug("Inside rendercallback of renderDiagram");
        // svgData is empty when this callback happens, update it so the styles will be applied
        _this.svgData = data;
        // force a render or we will not see an update
        _this.render();
      }
    };
    
    try {
      // if parsing the graph definition fails, the error handler will be called but the renderCallback() may also still be called.
      mermaidAPI.render(this.panel.graphId, graphDefinition, renderCallback, diagramContainer[0]);
    } catch (err) {
      diagramContainer.html('<p>Error rendering diagram. Check the diagram definition</p><p>'+ err + '</p>');
    }
  }
  
  updateDiagram(data) {
    if (this.panel.content.length > 0) {
      var mode = this.panel.mode;
      if (mode == 'url') {
        var templatedURL = this.templateSrv.replace(this.panel.mermaidServiceUrl, this.panel.scopedVars);
        var _this = this;
        this.$http({
          method: 'GET',
          url: templatedURL,
          headers: { 'Accept': 'text/x-mermaid,text/plain;q=0.9,*/*;q=0.8' }
        }).then(function successCallback(response) {
          //the response must have text/plain content-type
          // clearing the diagram here will result in less artifacting waiting for the response
          _this.clearDiagram();
          _this.renderDiagram(response.data, data);
        }, function errorCallback(response) {
          console.warn('error', response);
        })
      } else {
        this.clearDiagram();
        this.renderDiagram(this.panel.content, data);
      }
    }
  } // End updateDiagram()



  /**
   * substitute values inside "link text"
   * this will look for any composite prefixed with a #|!|@|& and substitute the value of the composite
   * if a series alias is found, in the form #alias, the value will be substituted
   * this allows link values to be displayed based on the metric
   *
   * Prefix Modifier For Composites
   *   # Raw Value of Series
   *   ! Raw Value plus Metric Name
   *   @ Formatted (Decimal Limited and Unit Format)
   *   & Formatted (Decimal Limited, Unit Format, and Metric Name)
   *
   * Prefix Modifier For Series
   *   # Raw Value of Series
   *   @ Formatted (Decimal Limited and Unit Format)
   *
   * @param  {[String]} graphDefinition [Content of Graph Definition Markdown]
   * @param  {[Array]} data [Series Data]
   * @return {[String]} [Modified Graph Definition]
   */
  substituteHashPrefixedNotation(graphDefinition, data) {
    // inspect the string, locate all # prefixed items, and replace them with the value
    // of the series. If no matching series is found, leave it alone
    var matches = graphDefinition.match(/(?:#|!|@|&)(\w+)/g);
    if (matches === null) return graphDefinition;
    // check if there is a composite with a matching name
    for (var i = 0; i < matches.length; i++) {
      var aMatch = matches[i];
      var valueType = aMatch[0];
      aMatch = aMatch.substring(1);
      // check composites first
      for (var j = 0; j < this.panel.composites.length; j++) {
        var aComposite = this.panel.composites[j];
        if (aComposite.name === aMatch) {
          // found matching composite, get the valueFormatted
          var displayedValue = null;
          switch (valueType) {
            case '#':
              displayedValue = data[aComposite.name].value;
              graphDefinition = graphDefinition.replace('#' + aMatch, displayedValue);
              break;
            case '!':
              displayedValue = data[aComposite.name].valueRawFormattedWithPrefix;
              graphDefinition = graphDefinition.replace('!' + aMatch, displayedValue);
              break;
            case '@':
              displayedValue = data[aComposite.name].valueFormatted;
              graphDefinition = graphDefinition.replace('@' + aMatch, displayedValue);
              break;
            case '&':
              displayedValue = data[aComposite.name].valueFormattedWithPrefix;
              graphDefinition = graphDefinition.replace('&' + aMatch, displayedValue);
              break;
          }
        }
      }
      // next check series
      for (var k = 0; k < this.series.length; k++) {
        var seriesItem = this.series[k];
        if (seriesItem.alias === aMatch) {
          var displayedValue = null;
          switch (valueType) {
            case '#':
              displayedValue = data[seriesItem.alias].value;
              graphDefinition = graphDefinition.replace('#' + aMatch, displayedValue);
              break;
            case '@':
              displayedValue = data[seriesItem.alias].valueFormatted;
              graphDefinition = graphDefinition.replace('@' + aMatch, displayedValue);
              break;
          }
        }
      }
    }
    return graphDefinition;
  }

  setValues() {
    var data = {};
    if (this.series && this.series.length > 0) {
      for (let i = 0; i < this.series.length; i++) {
        let seriesItem = this.series[i];
        console.debug('setting values for series');
        console.debug(seriesItem);
        data[seriesItem.alias] = this.applyOverrides(seriesItem.alias);
        // store alias in data
        data[seriesItem.alias].alias = seriesItem.alias;
        var lastPoint = _.last(seriesItem.datapoints);
        var lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;

        if (this.panel.valueName === 'name') {
          data[seriesItem.alias].value = 0;
          data[seriesItem.alias].valueRounded = 0;
          data[seriesItem.alias].valueFormated = seriesItem.alias;
        } else if (_.isString(lastValue)) {
          data[seriesItem.alias].value = 0;
          data[seriesItem.alias].valueFormated = _.escape(lastValue);
          data[seriesItem.alias].valueRounded = 0;
        } else {
          data[seriesItem.alias].value = seriesItem.stats[data[seriesItem.alias].valueName];
          var decimalInfo = this.getDecimalsForValue(data[seriesItem.alias].value);
          var formatFunc = kbn.valueFormats[data[seriesItem.alias].format];
          // put the value in quotes to escape "most" special characters
          data[seriesItem.alias].valueFormatted = formatFunc(data[seriesItem.alias].value, decimalInfo.decimals, decimalInfo.scaledDecimals);
          data[seriesItem.alias].valueRounded = kbn.roundValue(data[seriesItem.alias].value, decimalInfo.decimals);
        }
        if (this.panel.legend.gradient.enabled) {
          data[seriesItem.alias].color = this.getGradientForValue(data[seriesItem.alias].colorData, data[seriesItem.alias].value);
        } else {
          data[seriesItem.alias].color = getColorForValue(data[seriesItem.alias].colorData, data[seriesItem.alias].value);
        }
      }
    }
    // Map values to text if needed
    this.applyValueMapping(data);
    // now add the composites to data
    for (let i = 0; i < this.panel.composites.length; i++) {
      let aComposite = this.panel.composites[i];
      let currentWorstSeries = null;
      let currentWorstSeriesName = null;
      for (let j = 0; j < aComposite.metrics.length; j++) {
    	let aMetric = aComposite.metrics[j];
    	let seriesName = aMetric.seriesName;
        // make sure we have a match
        if (!data.hasOwnProperty(seriesName)) {
        	continue;
        }
        let seriesItem = data[seriesName];
        // check colorData thresholds
        if (currentWorstSeries === null) {
          currentWorstSeries = seriesItem;
        } else {
          currentWorstSeries = this.getWorstSeries(currentWorstSeries, seriesItem, aComposite.showLowest);
        }
      }
      // Prefix the valueFormatted with the actual metric name
      if (currentWorstSeries !== null) {
    	let copy = _.clone(currentWorstSeries);
    	copy.valueFormattedWithPrefix = currentWorstSeries.alias + ': ' + currentWorstSeries.valueFormatted;
    	copy.valueRawFormattedWithPrefix = currentWorstSeries.alias + ': ' + currentWorstSeries.value;
    	copy.valueFormatted = currentWorstSeries.alias + ': ' + currentWorstSeries.valueFormatted;
        // now push the composite into data
        data[aComposite.name] = copy;
      }
    }
    return data;
  } // End setValues()

  getWorstSeries(series1, series2, showLowest) {
    if (showLowest) {
    	// return series1 if the value is lower, otherwise return series2
    	return series1.value < series2.value ? series1 : series2;
    } else {
    	// return series1 if the value is greater, otherwise return series2
    	return series1.value > series2.value ? series1 : series2;
    }
  }

  getGradientForValue(data, value) {
    console.debug('Getting gradient for value');
    console.debug(data);
    console.debug(value);
    var min = Math.min.apply(Math, data.thresholds);
    var max = Math.max.apply(Math, data.thresholds);
    var absoluteDistance = max - min;
    var valueDistanceFromMin = value - min;
    var xPercent = valueDistanceFromMin / absoluteDistance;
    // Get the smaller number to clamp at 0.999 max
    xPercent = Math.min(0.999, xPercent);
    // Get the larger number to clamp at 0.001 min
    xPercent = Math.max(0.001, xPercent);
    if (data.invertColors) {
      xPercent = 1 - xPercent;
    }

    return getColorByXPercentage(this.canvas, xPercent);
  }

  applyOverrides(seriesItemAlias) {
    var seriesItem = {},
      colorData = {},
      overrides = {};

    console.debug('applying overrides for seriesItem');
    console.debug(seriesItemAlias);
    console.debug(this.panel.seriesOverrides);
    for (var i = 0; i < this.panel.seriesOverrides.length; i++) {
      console.debug('comparing:');
      console.debug(this.panel.seriesOverrides[i]);

      if (this.panel.seriesOverrides[i]) {
        var regex = kbn.stringToJsRegex(this.panel.seriesOverrides[i].alias);
        var matches = seriesItemAlias.match(regex);
        if (matches && matches.length > 0) {
          overrides = this.panel.seriesOverrides[i];
        }
      }
    }
    colorData.thresholds = (overrides.thresholds || this.panel.thresholds).split(',').map(function(strVale) {
      return Number(strVale.trim());
    });
    colorData.colorMap = this.panel.colors.slice();
    colorData.invertColors = overrides.invertColors || false;
    if (colorData.invertColors) {
      colorData.colorMap.reverse();
    }
    seriesItem.colorData = colorData;

    seriesItem.valueName = overrides.valueName || this.panel.valueName;

    seriesItem.format = overrides.unitFormat || this.panel.format;
    return seriesItem;
  }

	applyValueMapping(data) {
		for (let i = 0; i < this.panel.valueMaps.length; i++) {
			var map = this.panel.valueMaps[i];
			if (! map.hasOwnProperty('alias'))
				continue;
			var regex = kbn.stringToJsRegex(map.alias);
			console.debug("Checking mapping: " +map.alias);
			for(let j = 0; j < this.series.length; j++) {
				var matches = this.series[j].alias.match(regex);
				console.debug("  Series: " +this.series[j].alias);
				if (matches && matches.length > 0) {
					var seriesItem = this.series[j];
					var dataItem = data[seriesItem.alias];
					if (map.type == 1) {
						for(let k = 0; k < map.valueToText.length; k++) {
								//	
								// Value mappings
								//	
								var valueMapping = map.valueToText[k];
								console.debug("    Mapping: " +dataItem.valueFormatted +" =? " +valueMapping.value);
								if (valueMapping.value === 'null') {
									if (dataItem.value === null || dataItem.value === void 0) {
										dataItem.valueFormatted = valueMapping.text;
										return;
									}
									continue;
								} else if (parseFloat(valueMapping.value) == dataItem.valueRounded) {
									dataItem.valueFormatted = valueMapping.text;
									console.debug("Map value of series " +seriesItem.alias +": " +dataItem.valueRounded +" -> " +valueMapping.text);
									continue;
								}
						}
					} else if (map.type == 2) {
						for(let k = 0; k < map.rangeToText.length; k++) {
								//	
								// Range Mappings
								//	
								var rangeMapping = map.rangeToText[k];
								if (rangeMapping.from === 'null' && rangeNapping.to == 'null') {
									if (dataItem.value === null || dataItem.value === void 0) {
										dataItem.valueFormatted = rangeMapping.text;
										return;
									}
									continue;
								} else if (parseFloat(rangeMapping.from) <= dataItem.valueRounded && parseFloat(rangeMapping.to) >= dataItem.valueRounded) {
									dataItem.valueFormatted = rangeMapping.text;
									console.debug("Map value of series " +seriesItem.alias +": " +dataItem.valueRounded +" -> " +rangeMapping.text);
									continue;
								}
							}
					}
				}
			}
		}
	}

  invertColorOrder() {
    this.panel.colors.reverse();
    this.refresh();
  }

  getDecimalsForValue(value) {
    if (_.isNumber(this.panel.decimals)) {
      return {
        decimals: this.panel.decimals,
        scaledDecimals: null
      };
    }

    var delta = value / 2;
    var dec = -Math.floor(Math.log(delta) / Math.LN10);

    var magn = Math.pow(10, -dec),
      norm = delta / magn, // norm is between 1.0 and 10.0
      size;

    if (norm < 1.5) {
      size = 1;
    } else if (norm < 3) {
      size = 2;
      // special case for 2.5, requires an extra decimal
      if (norm > 2.25) {
        size = 2.5;
        ++dec;
      }
    } else if (norm < 7.5) {
      size = 5;
    } else {
      size = 10;
    }

    size *= magn;

    // reduce starting decimals if not needed
    if (Math.floor(value) === value) {
      dec = 0;
    }

    var result = {};
    result.decimals = Math.max(0, dec);
    result.scaledDecimals = result.decimals - Math.floor(Math.log(size) / Math.LN10) + 2;

    return result;
  }

  link(scope, elem, attrs, ctrl) {
    var templateSrv = this.templateSrv;
    var diagramElement = elem.find('.diagram');
    diagramElement.append('<div id="' + ctrl.containerDivId + '"></div>');
    var diagramContainer = $(document.getElementById(ctrl.containerDivId));
    console.debug('found diagramContainer');
    console.debug(diagramContainer);
    elem.css('height', '100%');

    var canvas = elem.find('.canvas')[0];
    ctrl.canvas = canvas;
    var gradientValueMax = elem.find('.gradient-value-max')[0];
    var gradientValueMin = elem.find('.gradient-value-min')[0];

    function updateCanvasStyle() {
      canvas.width = Math.max(diagramElement[0].clientWidth, 100);
      var canvasContext = canvas.getContext("2d");
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);

      var grd = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
      var colorWidth = 1 / Math.max(ctrl.panel.colors.length, 1);
      for (var i = 0; i < ctrl.panel.colors.length; i++) {
        var currentColor = ctrl.panel.colors[i];
        grd.addColorStop(Math.min(colorWidth * i, 1), currentColor);
      }
      canvasContext.fillStyle = grd;
      canvasContext.fillRect(0, 0, canvas.width, 3);
      ctrl.canvasContext = canvasContext;

      gradientValueMax.innerText = Math.max.apply(Math, ctrl.panel.thresholds.split(','));
      gradientValueMin.innerText = Math.min.apply(Math, ctrl.panel.thresholds.split(','));
    }
    updateCanvasStyle(); // run once at beginning so the gradients are ready on first data
    
    function selectElementById(container, id) {
    	return d3.select(container.getElementById(id)); // $(svg).find('#'+key).first(); // jquery doesnt work for some ID expressions [prometheus data]
    }
    
    function selectElementByEdgeLabel(container, id) {
    	return d3.select(container).selectAll('span')
	    	.filter(function(){ 
				return d3.select(this).text() == id;
	    	});
    }

    function selectDivElementByAlias(container, alias) {
    	var targetElement = d3.select(container).selectAll('div')
	    	.filter(function(){ 
				return d3.select(this).text() == alias;
	    	});
    	var node = targetElement.node();
    	if (node != null) {
    		var parentShape = $(node).closest('.node');
    		if (parentShape.length > 0) {
    			return d3.select(parentShape[0]);
    		}     		
    	}
    	return d3.select();
    }

    function selectTextElementByAlias(container, alias) {
    	return d3.select(container).selectAll('text')
	    	.filter(function(){ 
				return d3.select(this).text() == alias;
	    	});
    }
    
    function styleD3Shapes(targetElement, seriesItem) {
    	var shapes = targetElement.selectAll('rect,circle,polygon');
        shapes.style('fill', seriesItem.color);

        var div = targetElement.select('div');
        var p = div.append('p');
        p.classed('diagram-value', true);
        p.style('background-color', seriesItem.color);
        p.html(seriesItem.valueFormatted);
        targetElement.select('foreignObject')
          .attr('height', div.node().clientHeight);
    }
    
    function styleFlowChartEdgeLabel(targetElement, seriesItem) {
    	var edgeParent = d3.select(targetElement.node().parentNode);
    	edgeParent.append('br');
        var v = edgeParent.append('span');
        v.classed('diagram-value', true);
        v.style('background-color', seriesItem.color);
        v.html(seriesItem.valueFormatted);
    }

    function styleTextEdgeLabel(targetElement, seriesItem) {
      targetElement.each(function() {
        var el = this;
        var markerBox = {
          x: el.getBBox().x,
          y: el.getBBox().y + el.getBBox().height + 10,
          width: el.getBBox().width,
          height: el.getBBox().height
        };
        var line = d3.select(el.parentNode).select('line');
        d3.select(el.parentNode)
          .insert("rect")
          .style('fill', seriesItem.color)
          .attr("x", markerBox.x)
          .attr("y", markerBox.y)
          .attr("width", markerBox.width)
          .attr("height", markerBox.height);
        d3.select(el.parentNode)
          .insert("text")
          .text(seriesItem.valueFormatted)
          .attr("x", markerBox.x + markerBox.width/2)
          .attr("y", markerBox.y + markerBox.height-1)
          .attr("width", markerBox.width)
          .attr("height", markerBox.height)
          .style("text-anchor", "middle");
      });
    }
    
    function injectCustomStyle(ctrl) {
    	var diagramDiv = d3.select(document.getElementById(ctrl.panel.graphId));
    	var diagramStyleElement = diagramDiv.append('style');
    	diagramStyleElement.text(diagramStyleFormatter(ctrl.panel.styleValues));
    	var customStyleElement = diagramDiv.append('style');
    	customStyleElement.text(ctrl.panel.style);
    }

    function updateStyle() {
      var data = ctrl.svgData;
      ctrl.svgData = {}; // get rid of the data after consuming it. This prevents adding duplicate DOM elements
      console.debug('updating svg style');
      var svg = $(document.getElementById(ctrl.panel.graphId));
      if (ctrl.panel.maxWidth) {
        $(svg).css('max-width', '100%');
      }

      if (svg[0] === undefined) {
        return;
      }

      for (var key in data) {
        var seriesItem = data[key];
        
        // Find nodes by ID if we can
        //console.info('finding targetElement');
        var targetElement = selectElementById(svg[0], key);
        if (!targetElement.empty()) {
            styleD3Shapes(targetElement, seriesItem);
            continue;
        }
        
        targetElement = selectElementByEdgeLabel(svg[0], key);
        if (!targetElement.empty()) {
          styleFlowChartEdgeLabel(targetElement, seriesItem);
          continue;
        }
        
        targetElement = selectDivElementByAlias(svg[0], key);
        if (!targetElement.empty()) {
          styleD3Shapes(targetElement, seriesItem);
          continue;
        }

        targetElement = selectTextElementByAlias(svg[0], key);
        if (!targetElement.empty()) {
          styleTextEdgeLabel(targetElement, seriesItem);
          continue;
        }

        console.debug('couldnt not find a diagram node with id/text: ' + key);
      }
      
      injectCustomStyle(ctrl);
    } // End updateStyle()

     function render() {
      updateCanvasStyle();
      updateStyle();
    }

    this.events.on('render', function() {
      render();
      ctrl.renderingCompleted();
    });
  }
  // End Class
}

function getColorForValue(data, value) {
  console.debug('Getting color for value');
  console.debug(data);
  console.debug(value);
  for (var i = data.thresholds.length; i > 0; i--) {
    if (value >= data.thresholds[i - 1]) {
      console.debug('Color['+(i-1)+']: ' + data.colorMap[i]);
      return data.colorMap[i-1];
      //return data.colorMap[i];
    }
  }
  return _.first(data.colorMap);
}

function getColorByXPercentage(canvas, xPercent) {
  var x = canvas.width * xPercent;
  var context = canvas.getContext("2d");
  var p = context.getImageData(x, 1, 1, 1).data;
  var color = 'rgba(' + [p[0] + ',' + p[1] + ',' + p[2] + ',' + p[3]] + ')';
  return color;
}

DiagramCtrl.templateUrl = 'module.html';

export {
  DiagramCtrl,
  DiagramCtrl as MetricsPanelCtrl
};
