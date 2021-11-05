import _ from "lodash";

export class GenericDatasource {

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    this.type = instanceSettings.type;
    this.url = instanceSettings.url;
    this.name = instanceSettings.name;
    this.q = $q;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;

    this.severityLevels = {}
    if (instanceSettings.jsonData.severity_critical != undefined) {
      this.severityLevels[instanceSettings.jsonData.severity_critical.toLowerCase()] = 4;
    }
    if (instanceSettings.jsonData.severity_high != undefined) {
      this.severityLevels[instanceSettings.jsonData.severity_high.toLowerCase()] = 3;
    }
    if (instanceSettings.jsonData.severity_warning != undefined) {
      this.severityLevels[instanceSettings.jsonData.severity_warning.toLowerCase()] = 2;
    }
    if (instanceSettings.jsonData.severity_info != undefined) {
      this.severityLevels[instanceSettings.jsonData.severity_info.toLowerCase()] = 1;
    }
  }
  metricFindQuery(query) {
    let matchedFunction = {};
    if(query) {
      const queryTypes = [
        {
          type: 'names',
          regex: /^(label|annotation)_names\((.*?)\)\s*$/
        },
        {
          type: 'values',
          regex: /^(label|annotation)_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/
        },
        {
          type: 'key',
          regex: /^(labels|annotations|receivers|generatorURL)\((.*?)\)\s*$/
        }
      ]
      for (let i = 0; i < queryTypes.length; i++) {
        queryTypes[i].matches = query.match(queryTypes[i].regex)
        if (queryTypes[i].matches) {
          matchedFunction = queryTypes[i];
          break;
        }
      }
      if (matchedFunction.type) {
        query = matchedFunction[2] || ''
      }
      if(query) {
        query = encodeURIComponent(this.templateSrv.replace(query, {}, this.interpolateQueryExpr) || "");
      }
    }
    let unique = new Set();
    let results = []
    return this.backendSrv.datasourceRequest({
      url: this.url + '/api/v1/alerts?silenced=false&inhibited=false&filter='+query,
      method: 'GET'
    }).then(response => {
      response.data.data.forEach(value => {
        if(matchedFunction.type === 'key'){
            value = value[matchedFunction.matches[1]];
        }else if (matchedFunction.type === 'names') {
            value = Object.keys(value[matchedFunction.matches[1] + 's'])
        }else if (matchedFunction.type === 'values') {
            value = value[matchedFunction.matches[1] + 's'][matchedFunction.matches[3]];
        }
        _.castArray(value).forEach( v => {
            if(v) {
                if(typeof v === 'object'){
                    v=JSON.stringify(v);
                }
                if (!unique.has(v)) {
                    unique.add(v)
                    results.push({text: v})
                }
            }
        })
      })
      return results;
    });
  }
  query(options) {
    let query = this.buildQueryParameters(options);
    query.targets = query.targets.filter(t => !t.hide);
    if (query.targets.length <= 0) {
      return this.q.when({data: []});
    }
    let filter = encodeURIComponent(this.templateSrv.replace(query.targets[0].expr, options.scopedVars, this.interpolateQueryExpr) || "");
    // Format data for table panel
    if(query.targets[0].type === "table"){
      var labelSelector = this.parseLabelSelector(query.targets[0].labelSelector);
      return this.backendSrv.datasourceRequest({
        url: this.url + '/api/v1/alerts?silenced=false&inhibited=false&filter='+filter,
        method: 'GET',
      }).then(response => {
        let results = {
          "data": [{
            "rows": [],
            "columns": [],
            "type": "table"
          }]
        };

        if(response.data && response.data.data && response.data.data.length) {
          let columnsDict = this.getColumnsDict(response.data.data, labelSelector);
          results.data[0].columns = this.getColumns(columnsDict);

          for (let i = 0; i < response.data.data.length; i++) {
            let row = new Array(results.data[0].columns.length).fill("");
            let item = response.data.data[i];
            row[0] = [Date.parse(item['startsAt'])];

            for (let label of Object.keys(item['labels'])) {
              if(label in columnsDict) {
                if(label === 'severity') {
                  row[columnsDict[label]] = this.severityLevels[item['labels'][label]]
                } else {
                  row[columnsDict[label]] = item['labels'][label];
                }
              }
            }
            for (let annotation of Object.keys(item['annotations'])) {
              if(annotation in columnsDict) {
                row[columnsDict[annotation]] = item['annotations'][annotation];
              }
            }
            results.data[0].rows.push(row);
          }
        }
        return results;
      });
    } else {
      return this.backendSrv.datasourceRequest({
        url: this.url + '/api/v1/alerts?silenced=false&inhibited=false&filter='+filter,
        method: 'GET',
      }).then(response => {
        return {
          "data": [{ "datapoints": [ [response.data.data.length, Date.now()] ]}]
        }
      });
    }
  }

  interpolateQueryExpr(value, variable, defaultFormatFn) {
    if (typeof value === 'string') {
      return dsSpecialRegexEscape(value);
    }

    let escapedValues = _.map(value, dsSpecialRegexEscape);
    return escapedValues.join('|');
  }

  getColumns(columnsDict) {
    let columns =  [{ text: "Time", type: "time" }];
    for(let column of Object.keys(columnsDict)) {
      columns.push({ text: column, type: "string" })
    }
    return columns;
  }

  // Parses the label list into a map
  parseLabelSelector(input) {
    var map;
    if (typeof(input) === "undefined" || input.trim().length === 0) {
      map = ["*"];
    } else {
      map = input.trim().split(/\s*,\s*/);
    }
    return map;
  }

  // Creates a column index dictionary in to assist in data row construction
  getColumnsDict(data, labelSelector) {
    let index = 1; // 0 is the data column
    let columnsDict = {};
    let severityDefined = false;
    for (let i = 0; i < data.length; i++) {
      for (let labelIndex = 0; labelIndex < labelSelector.length; labelIndex++) {
        var selectedLabel = labelSelector[labelIndex];
        if (selectedLabel === "*") {
          // '*' maps to all labels/annotations not already added via the label selector list
          for (let label of Object.keys(data[i]['labels'])) {
            if(!(label in columnsDict)) {
              if (label === 'severity') {
                severityDefined = true
              }
              columnsDict[label] = index++;
            }
          }
          for (let annotation of Object.keys(data[i]['annotations'])) {
            if(!(annotation in columnsDict)) {
              columnsDict[annotation] = index++;
            }
          }
        } else if (!(selectedLabel in columnsDict)) {
          if (selectedLabel === 'severity') {
            severityDefined = true
          }
          columnsDict[selectedLabel] = index++;
        }
      }
    }
    if (!severityDefined) {
      columnsDict['severity'] = index++;
    }
    return columnsDict;
  }

  testDatasource() {
    return this.backendSrv.datasourceRequest({
      url: this.url + '/api/v1/status',
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        return { status: "success", message: "Data source is working", title: "Success" };
      }
    });
  }

  buildQueryParameters(options) {
    //remove placeholder targets
    options.targets = _.filter(options.targets, target => {
      return target.target !== 'select metric';
    });

    options.targetss = _.map(options.targets, target => {
      return {
        target: this.templateSrv.replace(target.target),
        expr: target.expr,
        refId: target.refId,
        hide: target.hide,
        type: target.type || 'single',
        legendFormat: target.legendFormat || ""
      };
    });
    return options;
  }

  formatInstanceText(labels, legendFormat){
    if(legendFormat === ""){
      return JSON.stringify(labels);
    }
    let aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
    return legendFormat.replace(aliasRegex, function(match, g1) {
      if (labels[g1]) {
        return labels[g1];
      }
      return "";
    });
  }


}
export function dsRegularEscape(value) {
  if (typeof value === 'string') {
    return value.replace(/'/g, "\\\\'");
  }
  return value;
}

export function dsSpecialRegexEscape(value) {
  if (typeof value === 'string') {
    return dsRegularEscape(value.replace(/\\/g, '\\\\\\\\').replace(/[$^*{}\[\]+?.()]/g, '\\\\$&'));
  }
  return value;
}
