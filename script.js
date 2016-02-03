var randomScalingFactor = function() {
    return Math.round(Math.random() * 100)
};

$(document).ready(function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    var gr = new Chart(ctx);
    $('#makeCanvas').on('click', function() {
        var a = $('#start').val(),
            b = $('#end').val(),
            numberOfBars = $('#numberOfBars').val(),
            lengthOfBars = $('#lengthOfBars').val(),
            step = (b - a) / numberOfBars,
            dataList = makeData(+a, +b, +step, +numberOfBars, +lengthOfBars),
            labelsList = makeLabels(+a, +b, +step),
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
        var t = document.createTextNode(makeStat(+a, +b, +step, +numberOfBars));       // Create a text node
        para.appendChild(t);                                          // Append the text to <p>
        document.body.appendChild(para);  


        
        gr.Bar(barChartData, {
            responsive: true
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
        array.push(start.toFixed(1));
    }
    return array;
}

function makeData(start, end, step, number, length) {
    var array = [];
    for (; start <= end; start += step) {
        array.push(1 / (Math.PI * Math.sqrt(Math.pow(b, 2) - Math.pow((start - a), 2))));
    }
    return array;
}

function makeStat(start, end, step, number) {
    var prob = (end - start) / number,
        matWait = 0, disp = 0, sko = 0, st = start;
    result = '';
    for (; start <= end; start += step) {
        matWait += start * prob;
    }
    start = st;
    for (; start <= end; start += step) {
        disp += start * Math.pow((start - matWait), 2);
    }
    sko = Math.sqrt(disp);
    result = 'Математическое ожидание: ' + matWait.toFixed(4) + ', дисперсия: ' + disp.toFixed(4) + ', среднеквадратическое отклонение: ' + sko.toFixed(4)
    return result;
}
