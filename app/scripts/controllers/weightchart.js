'use strict';

angular.module('weightwatcherClientApp')
  /* jshint ignore:start */
  .factory('D3Draw', function($rootScope){

    return {
      'render': function(){
        //X axis = timescale from first data date to today | Y axis weight from 150-220
        var chartConfig = {
          'data': $rootScope.weights,
          'width': 720,
          'height': 300,
          'padding': 30
        };

        //todochangerangetodynamic
        chartConfig.x = d3.time.scale().domain([new Date(chartConfig.data[0].date), new Date()]).range([0, chartConfig.width-35]),
        chartConfig.y = d3.scale.linear().domain([210,190]).range([0, chartConfig.height]);

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
              ticks(5).
              tickFormat(d3.time.format('%b %d')).
              tickSize(-chartConfig.height).
              tickPadding(8);

        var yAxis = d3.svg.axis().
              scale(chartConfig.y).
              orient('left').
              tickSize(-chartConfig.width).
              tickPadding(8);

        rootSVG.append('svg:g').
          attr('class', 'x axis').
          attr('transform', 'translate('+chartConfig.padding+', '+(chartConfig.height - chartConfig.padding)+')').
          call(xAxis);

        rootSVG.append('svg:g').
          attr('class', 'y axis').
          attr('transform', 'translate('+chartConfig.padding+', '+chartConfig.padding+')').
          call(yAxis);

        //Show guideline on mouseover
        var guideLine = d3.select('#weightChart').append('div').
              attr('class', '').
              style('position', 'absolute').
              style('z-index', '19').
              style('width', '1px').
              style('height', chartConfig.height - chartConfig.padding + 'px').
              style('top', '0px').
              style('margin-left', chartConfig.padding+'px').
              style('background', '#333');

        var dateArray = _.map($rootScope.weights, function(weight){
          var tempDate = new Date(weight.date);
          var month_date = tempDate.getMonth() +''+ tempDate.getDate();
          return month_date;
        });

        rootSVG.on('mousemove', function(){
          var mousex = d3.mouse(this)[0] - chartConfig.padding;
          var mousex_invert = chartConfig.x.invert(mousex);
          var hover_date = new Date(mousex_invert);
          hover_date = hover_date.getMonth() +''+ hover_date.getDate();

          var mapWeight = dateArray.indexOf(hover_date);
          if(mapWeight!== -1) {
            console.log(hover_date + '-' + $rootScope.weights[mapWeight].weight);
          }

          //Move guideline according to mouse position
          guideLine.style('left', mousex + 'px');
        });
      }
    };
  })
  /* jshint ignore:end */
  ;