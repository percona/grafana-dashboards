import * as _ from 'lodash';
import decodeGeoHash from './geohash';
import kbn from 'grafana/app/core/utils/kbn';

export default class DataFormatter {
  constructor(private ctrl) {}

  setValues(data) {
    if (this.ctrl.series && this.ctrl.series.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      this.ctrl.series.forEach(serie => {
        const lastPoint = _.last(serie.datapoints);
        const lastValue = _.isArray(lastPoint) ? lastPoint[0] : null;
        const location = _.find(this.ctrl.locations, loc => {
          return loc.key.toUpperCase() === serie.alias.toUpperCase();
        });

        if (!location) {
          return;
        }

        if (_.isString(lastValue)) {
          data.push({ key: serie.alias, value: 0, valueFormatted: lastValue, valueRounded: 0 });
        } else {
          const dataValue = {
            key: serie.alias,
            locationName: location.name,
            locationLatitude: location.latitude,
            locationLongitude: location.longitude,
            value: serie.stats[this.ctrl.panel.valueName],
            valueFormatted: lastValue,
            valueRounded: 0,
          };

          if (dataValue.value > highestValue) {
            highestValue = dataValue.value;
          }

          if (dataValue.value < lowestValue) {
            lowestValue = dataValue.value;
          }

          dataValue.valueRounded = kbn.roundValue(dataValue.value, parseInt(this.ctrl.panel.decimals, 10) || 0);
          data.push(dataValue);
        }
      });

      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }

  createDataValue(encodedGeohash, decodedGeohash, locationName, value) {
    const dataValue = {
      key: encodedGeohash,
      locationName: locationName,
      locationLatitude: decodedGeohash.latitude,
      locationLongitude: decodedGeohash.longitude,
      value: value,
      valueFormatted: value,
      valueRounded: 0,
    };

    dataValue.valueRounded = kbn.roundValue(dataValue.value, this.ctrl.panel.decimals || 0);
    return dataValue;
  }

  setGeohashValues(dataList, data) {
    if (!this.ctrl.panel.esGeoPoint || !this.ctrl.panel.esMetric) {
      return;
    }

    if (dataList && dataList.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      dataList.forEach(result => {
        if (result.type === 'table') {
          const columnNames = {};

          result.columns.forEach((column, columnIndex) => {
            columnNames[column.text] = columnIndex;
          });

          result.rows.forEach(row => {
            const encodedGeohash = row[columnNames[this.ctrl.panel.esGeoPoint]];
            const decodedGeohash = decodeGeoHash(encodedGeohash);
            const locationName = this.ctrl.panel.esLocationName
              ? row[columnNames[this.ctrl.panel.esLocationName]]
              : encodedGeohash;
            const value = row[columnNames[this.ctrl.panel.esMetric]];

            const dataValue = this.createDataValue(encodedGeohash, decodedGeohash, locationName, value);
            if (dataValue.value > highestValue) {
              highestValue = dataValue.value;
            }

            if (dataValue.value < lowestValue) {
              lowestValue = dataValue.value;
            }

            data.push(dataValue);
          });

          data.highestValue = highestValue;
          data.lowestValue = lowestValue;
          data.valueRange = highestValue - lowestValue;
        } else {
          result.datapoints.forEach(datapoint => {
            const encodedGeohash = datapoint[this.ctrl.panel.esGeoPoint];
            const decodedGeohash = decodeGeoHash(encodedGeohash);
            const locationName = this.ctrl.panel.esLocationName
              ? datapoint[this.ctrl.panel.esLocationName]
              : encodedGeohash;
            const value = datapoint[this.ctrl.panel.esMetric];

            const dataValue = this.createDataValue(encodedGeohash, decodedGeohash, locationName, value);
            if (dataValue.value > highestValue) {
              highestValue = dataValue.value;
            }
            if (dataValue.value < lowestValue) {
              lowestValue = dataValue.value;
            }
            data.push(dataValue);
          });

          data.highestValue = highestValue;
          data.lowestValue = lowestValue;
          data.valueRange = highestValue - lowestValue;
        }
      });
    }
  }

  static tableHandler(tableData) {
    const datapoints: any[] = [];

    if (tableData.type === 'table') {
      const columnNames = {};

      tableData.columns.forEach((column, columnIndex) => {
        columnNames[columnIndex] = column.text;
      });

      tableData.rows.forEach(row => {
        const datapoint = {};

        row.forEach((value, columnIndex) => {
          const key = columnNames[columnIndex];
          datapoint[key] = value;
        });

        datapoints.push(datapoint);
      });
    }

    return datapoints;
  }

  setTableValues(tableData, data) {
    if (tableData && tableData.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      tableData[0].forEach(datapoint => {
        let key;
        let longitude;
        let latitude;

        if (this.ctrl.panel.tableQueryOptions.queryType === 'geohash') {
          const encodedGeohash = datapoint[this.ctrl.panel.tableQueryOptions.geohashField];
          const decodedGeohash = decodeGeoHash(encodedGeohash);

          latitude = decodedGeohash.latitude;
          longitude = decodedGeohash.longitude;
          key = encodedGeohash;
        } else {
          latitude = datapoint[this.ctrl.panel.tableQueryOptions.latitudeField];
          longitude = datapoint[this.ctrl.panel.tableQueryOptions.longitudeField];
          key = `${latitude}_${longitude}`;
        }

        const dataValue = {
          key: key,
          locationName: datapoint[this.ctrl.panel.tableQueryOptions.labelField] || 'n/a',
          locationLatitude: latitude,
          locationLongitude: longitude,
          value: datapoint[this.ctrl.panel.tableQueryOptions.metricField],
          valueFormatted: datapoint[this.ctrl.panel.tableQueryOptions.metricField],
          valueRounded: 0,
        };

        if (dataValue.value > highestValue) {
          highestValue = dataValue.value;
        }

        if (dataValue.value < lowestValue) {
          lowestValue = dataValue.value;
        }

        dataValue.valueRounded = kbn.roundValue(dataValue.value, this.ctrl.panel.decimals || 0);
        data.push(dataValue);
      });

      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }

  setJsonValues(data) {
    if (this.ctrl.series && this.ctrl.series.length > 0) {
      let highestValue = 0;
      let lowestValue = Number.MAX_VALUE;

      this.ctrl.series.forEach(point => {
        const dataValue = {
          key: point.key,
          locationName: point.name,
          locationLatitude: point.latitude,
          locationLongitude: point.longitude,
          value: point.value !== undefined ? point.value : 1,
          valueRounded: 0,
        };
        if (dataValue.value > highestValue) {
          highestValue = dataValue.value;
        }
        if (dataValue.value < lowestValue) {
          lowestValue = dataValue.value;
        }
        dataValue.valueRounded = Math.round(dataValue.value);
        data.push(dataValue);
      });
      data.highestValue = highestValue;
      data.lowestValue = lowestValue;
      data.valueRange = highestValue - lowestValue;
    }
  }
}
