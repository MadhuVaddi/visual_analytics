/**
 * Created by Madhu on 4/30/16.
 */
var options = {"separator": ","};

var years = [];
var arrayFilteredData = [];
var filteredWorldJSON = [];

for (var y = 1900; y < 2014; y++) {
    years.push(y)
}
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var selectYear = document.getElementById("selectYear");
var selectMonth = document.getElementById("selectMonth");

var jsondata = [];

for (var i = 0; i < years.length; i++) {
    var opt = years[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectYear.appendChild(el);
}

for (var i = 0; i < months.length; i++) {
    var mname = months[i];
    var op = document.createElement("option");
    op.textContent = mname;
    op.value = mname;
    selectMonth.appendChild(op);
}

var currentYear = years[0];
var currentMonth = months.indexOf(months[0]) + 1;

function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
        "gi"
    );

    var arrData = [
        []
    ];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        var strMatchedDelimiter = arrMatches[ 1 ];
        if (
            strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
            arrData.push([]);
        }
        var strMatchedValue;

        if (arrMatches[ 2 ]) {
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp("\"\"", "g"),
                "\""
            );
        } else {
            strMatchedValue = arrMatches[ 3 ];
        }
        arrData[ arrData.length - 1 ].push(strMatchedValue);
    }

    return( arrData );
}

function csvJSON(array) {
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
        objArray[i - 1] = {};
        for (var k = 0; k < array[0].length && k < array[i].length; k++) {
            var key = array[0][k];
            objArray[i - 1][key] = array[i][k]
        }
    }
    return objArray;
}

function customizeData() {
//    $.ajax({
//        url: "../data/tempByCountries.csv",
//        async: false,
//        success: function (csvd) {
//            arraydata = CSVToArray(csvd)
//        },
//        dataType: "text",
//        complete: function () {
    d3.csv("../data/tempByCountries.csv", function (error, data) {
        jsondata = data;
        if (jsondata.length > 1) {
            filterdataEngine(years[0], 1);
        }
    });
//            if (jsondata.length > 1) {
//                filterdataEngine(years[0], 1);
//            }
//        }
//    });
}
customizeData();


function filterdataEngine(value, type) {
    if (type == 1) {
        currentYear = value;
    } else {
        currentMonth = months.indexOf(value) + 1;
    }

    var sCurrentYear = currentYear.toString();
    var sCurrentMonth = currentMonth.toString();


//    filteredWorldJSON = jsondata;

    var filterdata = $(jsondata).filter(function (i, n) {
        return n.year === sCurrentYear && n.month === sCurrentMonth
    });

    var arrayFilteredData = [];

    for (var i = 0; i < filterdata.length; i++) {
        arrayFilteredData.push([filterdata[i].code, filterdata[i].avgtemp])
    }

    mapMaker(arrayFilteredData);
}


function mapMaker(arrayFilteredData) {
    var series = arrayFilteredData;
    var dataset = {};

// We need to colorize every country based on "numberOfWhatever"
// colors should be uniq for every value.
// For this purpose we create palette(using min/max series-value)
    var onlyValues = series.map(function (obj) {
        return obj[1];
    });
    var minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);
    var med = (minValue+maxValue)/ 2,
        med1 = (minValue+med)/ 2,
        med2 = (maxValue+med)/ 2,
        med11= (minValue+med1)/ 2,
        med12= (med+med1)/ 2,
        med21= (med+med2)/ 2,
        med22= (maxValue+med2)/ 2;

    var paletteScale = d3.scale.linear()
        .domain([minValue, med11, med1, med12, med, med21, med2, med22, maxValue])
        .range(["#0400ff", "#009BFF", "#00d4ff", "#00ff10", "#d7ff00", "#FFa000", "#FF5a00", "#FF1e00", "#FF0040"]); // blue color


    document.getElementById("legendT1").innerHTML = "";
    var legend = d3.select('#legendT1')
        .append('ul')
        .attr('class', 'list-inline');

    var keys = legend.selectAll('li.key1')
        .data(paletteScale.range())

    keys.enter().append('li')
        .attr('class', 'key')
        .style('border-top-color', String)
        .text(function(d, i) {
            var r = paletteScale.domain()[i];
            return Math.round(r * 100) / 100;
        });

// fill dataset in appropriate format
    series.forEach(function (item) { //
        // item example value ["USA", 70]
        var iso = item[0],
            value = item[1];
        dataset[iso] = { numberOfThings: value, fillColor: paletteScale(value) };
    });
    document.getElementById("worldId").innerHTML = "";
// render map
    new Datamap({
        element: document.getElementById('worldId'),
        projection: 'mercator', // big world map
        // countries don't listed in dataset will be painted with this color
        fills: { defaultFill: '#F5F5F5' },
        data: dataset,
        geographyConfig: {
            borderColor: '#DEDEDE',
            highlightBorderWidth: 2,
            // don't change color on mouse hover
            highlightFillColor: function (geo) {
                return geo['fillColor'] || '#F5F5F5';
            },
            // only change border
            highlightBorderColor: '#B7B7B7',
            // show desired information in tooltip
            popupTemplate: function (geo, data) {
                // don't show tooltip if country don't present in dataset
                if (!data) {
                    return;
                }
                // tooltip content
                return ['<div class="hoverinfo">',
                    '<strong>', geo.properties.name, '</strong>',
                    '<br>Temperature: <strong>', data.numberOfThings, '</strong>',
                    '</div>'].join('');
            }
        }
    });
}

function downlaoding(){
    var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = DOMURL.createObjectURL(svg);
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        console.log(png)
        document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
        DOMURL.revokeObjectURL(png);

        var a = document.createElement("a");
        a.download = "sample.jpg";
        a.href = png;
        a.click();
    };
    img.src = url;
}
