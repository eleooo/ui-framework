
import React from 'react';
/* global d3 */
import 'd3';
import { TestCaseFactory } from 'react-test-kit';
import Chart from './Chart.jsx';

describe('Chart', () => {
  let testCase;

  const data = [{
    name: 'newYork',
    color: '#1192ca',
    values: [{
      date: '2012-03-30T07:00:00.000Z',
      yValue: 46.5,
    }, {
      date: '2012-03-31T07:00:00.000Z',
      yValue: 42.2,
    }, {
      date: '2012-04-01T07:00:00.000Z',
      yValue: 45.3,
    }, {
      date: '2012-04-02T07:00:00.000Z',
      yValue: 48.1,
    }, {
      date: '2012-04-03T07:00:00.000Z',
      yValue: 51.2,
    }],
  }, {
    name: 'sanFrancisco',
    color: '#F07171',
    values: [{
      date: '2012-03-30T07:00:00.000Z',
      yValue: 54.5,
    }, {
      date: '2012-03-31T07:00:00.000Z',
      yValue: 56.2,
    }, {
      date: '2012-04-01T07:00:00.000Z',
      yValue: 51.1,
    }, {
      date: '2012-04-02T07:00:00.000Z',
      yValue: 50.5,
    }, {
      date: '2012-04-03T07:00:00.000Z',
      yValue: 52.2,
    }],
  }, {
    name: 'austin',
    color: '#60C04F',
    values: [{
      date: '2012-03-30T07:00:00.000Z',
      yValue: 73.5,
    }, {
      date: '2012-03-31T07:00:00.000Z',
      yValue: 73.9,
    }, {
      date: '2012-04-01T07:00:00.000Z',
      yValue: 75.3,
    }, {
      date: '2012-04-02T07:00:00.000Z',
      yValue: 75.4,
    }, {
      date: '2012-04-03T07:00:00.000Z',
      yValue: 77.3,
    }],
  }];

  const minDate = 1333090800000;
  const maxDate = 1333436400000;
  const minTemperature = 42.2;
  const maxTemperature = 77.3;
  const yAxisLabelWidth = 36;
  const height = 400;

  function yAxisFormat(value, index) {
    return `yAxis${index}`;
  }

  beforeEach(() => {
    const props = {
      data,
      dateRange: [minDate, maxDate],
      dateFormat: d3.time.months,
      yAxisRange: [minTemperature, maxTemperature],
      yAxisFormat,
      yAxisLabelWidth,
      height,
    };

    testCase = TestCaseFactory.createFromElement(<Chart {...props} />);
  });

  describe('Structure', () => {
    describe('x axis', () => {
      it('is rendered', () => {
        const xAxis = testCase.find('.chartXAxis');
        expect(xAxis.length).toBe(1);
      });
    });

    describe('y axis', () => {
      it('is rendered', () => {
        const yAxis = testCase.find('.chartYAxis');
        expect(yAxis.length).toBe(1);
      });
    });

    describe(`${data.length} chart lines`, () => {
      it('are rendered', () => {
        const lines = testCase.find('.chartLine');
        expect(lines.length).toBe(data.length);
      });
    });
  });

  describe('Props', () => {
    describe('data', () => {
      describe('color', () => {
        it('is applied to the chart\'s lines', () => {
          const lines = testCase.find('.chartLine');
          lines.forEach((line, index) => {
            const lineColor = line.getAttribute('style').toLowerCase();
            const specifiedColor = data[index].color.toLowerCase();
            expect(lineColor.indexOf(specifiedColor) !== -1).toBe(true);
          });
        });
      });
    });

    describe('dateRange', () => {
      it('defines the number of x axis ticks', () => {
        const xAxisTicks = testCase.find('.chartXAxisTick__text');
        expect(xAxisTicks.length).toBe(1);
      });
    });

    describe('dateFormat', () => {
      it('defines the x axis tick mark text', () => {
        const xAxisTicks = testCase.find('.chartXAxisTick__text');
        expect(xAxisTicks[0].textContent).toBe('April');
      });
    });

    describe('yAxisRange', () => {
      it('defines the number of y axis ticks', () => {
        const yAxisTicks = testCase.find('.chartYAxisTick__text');
        expect(yAxisTicks.length).toBe(7);
      });
    });

    describe('yAxisFormat', () => {
      it('defines the y axis tick mark text', () => {
        const yAxisTicks = testCase.find('.chartYAxisTick__text');
        yAxisTicks.forEach((tick, index) => {
          expect(tick.textContent).toBe(yAxisFormat(undefined, index));
        });
      });
    });

    describe('height', () => {
      it('is applied to the SVG', () => {
        const svg = testCase.first('.chart__svg');
        expect(svg.getAttribute('height')).toBe(height.toString());
      });
    });
  });
});
