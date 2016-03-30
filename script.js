$(document).ready(function() {
    window.arrayF = [];
    var ctx = document.getElementById("canvas").getContext("2d");
    var gr = new Chart(ctx);
    $('#makeCanvas').on('click', function() {
        var a = $('#start').val(),
            b = $('#end').val(),
            numberOfBars = $('#numberOfBars').val(),
            lengthOfBars = $('#lengthOfBars').val(),
            step = (b - a) / numberOfBars,
            dataList = makeData(+a, +b, +numberIntervals, +numberDots),
            labelsList = makeLabels(+a, +b, +(b - a) / numberIntervals),
            barChartData = {
                labels: labelsList,
                datasets: [{
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: dataList
                }]
            };
        var para = document.createElement("P");                       // Create a <p> element
        var t = document.createTextNode(makeStat(arrayF));      // Create a text node
        para.appendChild(t);                                          // Append the text to <p>
        document.body.appendChild(para);  

        gr.Bar(barChartData, {
            responsive: true
        });
    });
});

var a = document.getElementById('start') || 0,
    b = document.getElementById('end') || 100,
    numberIntervals = document.getElementById('numberIntervals') || 100,
    numberDots = document.getElementById('numberDots') || 10000;
if (b < 0) {
    alert("Конец больше 0!");
    location.reload();
}

var dataList = makeData(+a, +b, +numberIntervals, +numberDots),
    labelsList = makeLabels(+a, +b, +(b - a) / numberDots);
var barChartData = {
    labels: labelsList,
    datasets: [{
        fillColor: "rgba(220,220,220,0.5)",
        strokeColor: "rgba(220,220,220,0.8)",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: dataList
    }]
}

function makeLabels(start, end, step) {
    var array = [];
    for (; start <= end; start += step) {
        array.push(start.toFixed(2));
    }
    return array;
}

function formula(start, end, random) {
    var result = end * Math.sin(Math.PI * (random - 1 / 2)) + end;
    return result;
}

function makeData(start, end, length, number) {
    var array = [];
    var toGraph = []
    for (var i = 0; i < number; i++) {
        array.push(parseFloat(formula(start, end, Math.random())));
    }
    array.sort();
    window.arrayF = array;
    var min = array[0];
    var max = array[array.length - 1];
    var delta = (max - min) / length;
    for (var j = min; j < max; j += delta) {
        toGraph.push(parseFloat(numberDotsInInterval(j, j + delta, array)));
    }
    return toGraph;
}

function numberDotsInInterval(start, end, array) {
    var count = 0;
    for (var i = 0; i < array.length - 1; i++) {
        if (start > array[i] && array[i] < end) {
            count++;
        }
    }
    return count;
}

function matExp(array) {
    var result = 0,
        sum = 0;
    for (var i = 0; i < array.length - 1; i++) {
        sum += array[i];
    }
    result = sum / array.length;
    return result;
}
function varience(array) {
    var result = 0,
        sum = 0,
        mean = matExp(array);
    for (var i = 0; i < array.length - 1; i++) {
        sum += (array[i] - mean) * (array[i] - mean);
    }
    result = sum / array.length;
    return result;
}
function makeStat(array) {
    return 'Математическое ожидание: ' + matExp(array).toFixed(3) + ', дисперсия: ' + varience(array).toFixed(3) + ', среднеквадратическое отклонение: ' + Math.sqrt(varience(array)).toFixed(3);
}