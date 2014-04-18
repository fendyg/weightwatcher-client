'use strict';

angular.module('weightwatcherClientApp')
  .controller('weightChartCtrl', function(D3Draw){
    D3Draw.render();
  })
  /* jshint ignore:start */
  .factory('D3Draw', function($rootScope){
    var chartConfig = {
      'width': 700,
      'height': 300
    }
    return {
      'render': function(){
        var rootSVG = d3.select('#weightChart').
                        append('svg:svg').
                        attr('width', chartConfig.width).
                        attr('height', chartConfig.height);
        rootSVG.append('svg:rect').attr('x', 100).attr('y', 100).attr('height', 100).attr('width', 200);
      }
    };
  })
  /* jshint ignore:end */
  ;