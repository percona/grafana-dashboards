import DataFormatter from './data_formatter';
import _ from 'lodash';

describe('DataFormatter', () => {
  let dataFormatter;
  let formattedData: any[] = [];

  describe('when latitude and longitude are given in table data and query type is coordinates', () => {
    beforeEach(() => {
      const ctrl = {
        panel: {
          tableQueryOptions: {
            queryType: 'coordinates',
            latitudeField: 'latitude',
            longitudeField: 'longitude'
          }
        }
      };
      dataFormatter = new DataFormatter(ctrl);
    });

    it('should use latitude and longitude coordinates', () => {
      const tableData = [
        [
          {
            latitude: 1,
            longitude: 2
          },
          {
            latitude: 3,
            longitude: 4
          }
        ]
      ];
      const data: any[] = [];

      dataFormatter.setTableValues(tableData, data);

      expect(data[0].locationLatitude).toEqual(1);
      expect(data[0].locationLongitude).toEqual(2);
      expect(data[1].locationLatitude).toEqual(3);
      expect(data[1].locationLongitude).toEqual(4);
    });
  });

  describe('when geohash in table data and query type is geohash', () => {
    beforeEach(() => {
      const ctrl = {
        panel: {
          tableQueryOptions: {
            queryType: 'geohash',
            geohashField: 'geohash',
          }
        }
      };
      dataFormatter = new DataFormatter(ctrl);
    });

    it('should use the geohash field for the query', () => {
      const tableData = [
        [
          {
            latitude: 1,
            longitude: 2,
            geohash: 'stq4s3x' // 29.9796, 31.1345
          },
          {
            latitude: 3,
            longitude: 4,
            geohash: 'p05010r' // -89.997, 139.273
          }
        ]
      ];
      const data: any[] = [];

      dataFormatter.setTableValues(tableData, data);

      expect(data[0].locationLatitude).toBeCloseTo(29.9796);
      expect(data[0].locationLongitude).toBeCloseTo(31.1345);
      expect(data[1].locationLatitude).toBeCloseTo(-89.998);
      expect(data[1].locationLongitude).toBeCloseTo(139.272);
    });
  });

  describe('when the time series data matches the location', () => {
    beforeEach(() => {
      const ctrl = {
        panel: {
          valueName: 'total'
        },
        locations: [
          {key: 'IE', name: 'Ireland', latitude: 1, longitude: 1},
          {key: 'SE', name: 'Sweden', latitude: 2, longitude: 2},
        ],
        series: [
          {alias: 'IE', datapoints: [1, 2], stats: {total: 3}},
          {alias: 'SE', datapoints: [2, 3], stats: {total: 5}},
        ]
      };
      dataFormatter = new DataFormatter(ctrl);
      dataFormatter.setValues(formattedData);
    });

    it('should format the data and match the serie to a location', () => {
      expect(formattedData[0].key).toEqual('IE');
      expect(formattedData[0].locationName).toEqual('Ireland');
      expect(formattedData[0].locationLatitude).toEqual(1);
      expect(formattedData[0].locationLongitude).toEqual(1);
      expect(formattedData[0].value).toEqual(3);

      expect(formattedData[1].key).toEqual('SE');
      expect(formattedData[1].locationName).toEqual('Sweden');
      expect(formattedData[1].locationLatitude).toEqual(2);
      expect(formattedData[1].locationLongitude).toEqual(2);
      expect(formattedData[1].value).toEqual(5);
    });
  });

  describe('when the time series data has lowercase country codes', () => {
    beforeEach(() => {
      const ctrl = {
        panel: {
          valueName: 'total'
        },
        locations: [
          {key: 'IE', name: 'Ireland', latitude: 1, longitude: 1},
          {key: 'SE', name: 'Sweden', latitude: 2, longitude: 2},
        ],
        series: [
          {alias: 'ie', datapoints: [1, 2], stats: {total: 3}},
          {alias: 'se', datapoints: [2, 3], stats: {total: 5}},
        ]
      };
      dataFormatter = new DataFormatter(ctrl);
      dataFormatter.setValues(formattedData);
    });

    it('should format the data and match the serie to a location', () => {
      expect(formattedData[0].key).toEqual('ie');
      expect(formattedData[0].locationName).toEqual('Ireland');
      expect(formattedData[0].locationLatitude).toEqual(1);
      expect(formattedData[0].locationLongitude).toEqual(1);
      expect(formattedData[0].value).toEqual(3);

      expect(formattedData[1].key).toEqual('se');
      expect(formattedData[1].locationName).toEqual('Sweden');
      expect(formattedData[1].locationLatitude).toEqual(2);
      expect(formattedData[1].locationLongitude).toEqual(2);
      expect(formattedData[1].value).toEqual(5);
    });
  });

  describe('when the time series data does not match any location', () => {
    beforeEach(() => {
      const ctrl = {
        panel: {
          valueName: 'total'
        },
        locations: [{key: 'IE', name: 'Ireland', latitude: 1, longitude: 1}],
        series: [
          {alias: 'SX', datapoints: [1, 2], stats: {total: 3}},
          {alias: 'IE', datapoints: [1, 2], stats: {total: 3}}
        ]
      };
      dataFormatter = new DataFormatter(ctrl);
      dataFormatter.setValues(formattedData);
    });

    it('should ignore the serie', () => {
      expect(formattedData.length).toEqual(1);
    });
  });

  describe('when the time series data has decimals', () => {
    describe('and decimals are specified as an integer', () => {
      beforeEach(() => {
        const ctrl = {
          panel: {
            valueName: 'total',
            decimals: 2
          },
          locations: [
            {key: 'IE', name: 'Ireland', latitude: 1, longitude: 1},
            {key: 'SE', name: 'Sweden', latitude: 2, longitude: 2},
          ],
          series: [
            {alias: 'IE', datapoints: [1.11, 2.22], stats: {total: 3.33}},
            {alias: 'SE', datapoints: [2.221, 3.331], stats: {total: 5.552}},
          ]
        };
        dataFormatter = new DataFormatter(ctrl);
        dataFormatter.setValues(formattedData);
      });

      it('should format the value with 2 decimals', () => {
        expect(formattedData[1].valueRounded).toEqual(5.55);
      });
    });

    describe('and decimals are specified as a string', () => {
      beforeEach(() => {
        const ctrl = {
          panel: {
            valueName: 'total',
            decimals: '2'
          },
          locations: [
            {key: 'IE', name: 'Ireland', latitude: 1, longitude: 1},
            {key: 'SE', name: 'Sweden', latitude: 2, longitude: 2},
          ],
          series: [
            {alias: 'IE', datapoints: [1.11, 2.22], stats: {total: 3.33}},
            {alias: 'SE', datapoints: [2.221, 3.331], stats: {total: 5.552}},
          ]
        };
        dataFormatter = new DataFormatter(ctrl);
        dataFormatter.setValues(formattedData);
      });

      it('should format the value with 2 decimals', () => {
        expect(formattedData[1].valueRounded).toEqual(5.55);
      });
    });
  });

  afterEach(() => {
    formattedData = [];
  });
});
