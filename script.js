
var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var a = 0,
  b = 100,
  numberOfBars = 100,
  lengthOfBars = 1,
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

window.onload = function() {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myBar = new Chart(ctx).Bar(barChartData, {
    responsive : true
  });
}

function makeLabels(start, end, step) {
  var array = [];
  for (; start < end; start += step) {
    array.push(start);
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
