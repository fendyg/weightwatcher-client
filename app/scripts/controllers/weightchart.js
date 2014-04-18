'use strict';

angular.module('weightwatcherClientApp')
  /* jshint ignore:start */
  .factory('D3Draw', function($rootScope){

    return {
      'render': function(){
        //X axis = timescale from first data date to today | Y axis weight from 150-220
        var chartConfig = {
          'data': $rootScope.weights,
          'width': 700,
          'height': 300,
          'padding': 40
        };

        //todochangerangetodynamic
        chartConfig.x = d3.time.scale().domain([new Date(chartConfig.data[0].date), new Date()]).range([0, chartConfig.width]),
        chartConfig.y = d3.scale.linear().domain([210,190]).rangeRound([0, chartConfig.height]);

        $('#weightChart').html('');

        var rootSVG = d3.select('#weightChart').
              append('svg:svg').
              attr('width', chartConfig.width).
              attr('height', chartConfig.height);

        //Line group for weight data
        var lineGroup = rootSVG.append('svg:g').
              attr('transform', 'translate('+chartConfig.padding+', '+chartConfig.padding+')');

        lineGroup.append('svg:rect').
          attr('x',0).
          attr('y',0).
          attr('width', chartConfig.width).
          attr('height', chartConfig.height).
          attr('fill', 'none');

        var weightLine = d3.svg.line().
              x(function(d) { return chartConfig.x(new Date(d.date))}).
              y(function(d) { return chartConfig.y(d.weight); }).
              interpolate('linear');

        lineGroup.append('svg:path').
          attr('d', weightLine(chartConfig.data)).
          attr('class', 'path').
          attr('stroke', 'red').
          attr('stroke-width', 2).
          attr('fill', 'none');

        //Line group for axis
        var xAxis = d3.svg.axis().
              scale(chartConfig.x).
              orient('bottom').
              tickFormat(d3.time.format('%b %d')).
              tickSize(1).
              tickPadding(8);

        var yAxis = d3.svg.axis().
              scale(chartConfig.y).
              orient('left').
              tickPadding(8);

        rootSVG.append('svg:g').
          attr('class', 'x axis').
          attr('transform', 'translate('+chartConfig.padding+', '+(chartConfig.height - chartConfig.padding)+')').
          call(xAxis);

        rootSVG.append('svg:g').
          attr('class', 'y axis').
          attr('transform', 'translate('+chartConfig.padding+', '+chartConfig.padding+')').
          call(yAxis);
      }
    };
  })
  /* jshint ignore:end */
  ;