
var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

$(document).ready(function() {
  $('#makeCanvas').on('click', function() {
    var a = $('#start').val(),
      b = $('#end').val(),
      numberOfBars = $('#numberOfBars').val(),
      lengthOfBars = $('#lengthOfBars').val(),
      step = (b - a) / numberOfBars,
      dataList = makeData(+a, +b, +step, +numberOfBars, +lengthOfBars);
      labelsList = makeLabels(+a, +b, +step),
      barChartData1 = {
        labels : labelsList,
        datasets : [{
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data : dataList
        }]
      };
    var ctx = document.getElementById("canvas").getContext("2d");
    var gr = new Chart(ctx).Bar(barChartData1, {
      responsive : true
    });

  });
});

var a = document.getElementById('start') || 0,
  b = document.getElementById('end') || 100,
  numberOfBars = document.getElementById('numberOfBars') || 100,
  lengthOfBars = document.getElementById('lengthOfBars') || 1,
  step = (b - a) / numberOfBars;

var dataList = makeData(a, b, step, numberOfBars, lengthOfBars);
var labelsList = makeLabels(a, b, step);
var barChartData = {
  labels : labelsList,
  datasets : [{
      fillColor : "rgba(220,220,220,0.5)",
      strokeColor : "rgba(220,220,220,0.8)",
      highlightFill: "rgba(220,220,220,0.75)",
      highlightStroke: "rgba(220,220,220,1)",
      data : dataList
    }]
}


function makeLabels(start, end, step) {
  var array = [];
  for (; start < end; start += step) {
    array.push(start.toFixed(1));
  }
  return array;
}

function makeData(start, end, step, number, length) {
  var array = [];
  for (; start < end; start += step) {
    array.push(1 / (Math.PI * Math.sqrt(Math.pow(b, 2) - Math.pow((start-a), 2))));
  }
  return array;
}
