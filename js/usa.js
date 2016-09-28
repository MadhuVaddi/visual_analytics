var yearsT2 = [];
var arrayFilteredDataT2 = [];
var filteredUSAJSON = [];
var jsondataT2 = [];

for (var y = 1900; y < 2014; y++) {
    yearsT2.push(y)
}
var monthsT2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var selectYearT2 = document.getElementById("selectYearT2");
var selectMonthT2 = document.getElementById("selectMonthT2");

for (var i = 0; i < years.length; i++) {
    var opt = yearsT2[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectYearT2.appendChild(el);
}

for (var i = 0; i < months.length; i++) {
    var mname = monthsT2[i];
    var op = document.createElement("option");
    op.textContent = mname;
    op.value = mname;
    selectMonthT2.appendChild(op);
}

var currentYearT2 = years[0];
var currentMonthT2 = months.indexOf(months[0]) + 1;

function customizeDataT2() {
//    $.ajax({
//        url: "../data/tempByStates.csv",
//        async: false,
//        success: function (csvd) {
//            arraydataT2 = CSVToArray(csvd)
//        },
//        dataType: "text",
//        complete: function () {
        d3.csv("../data/tempByStates.csv", function (error, data) {
            jsondataT2 = data;
            if (jsondataT2.length > 1) {
                filterdataEngineT2(years[0], 1);
            }
        });
//            }
//        }
//    });
}
customizeDataT2();

function filterdataEngineT2(value, type) {
    if (type == 1) {
        currentYearT2 = value;
    } else {
        currentMonthT2 = monthsT2.indexOf(value) + 1;
    }

    var sCurrentYearT2 = currentYearT2.toString();
    var sCurrentMonthT2 = currentMonthT2.toString();

//    filteredUSAJSON = jsondataT2;

    var filterdataT2 = $(jsondataT2).filter(function (i, n) {
        return n.year === sCurrentYearT2 && n.month === sCurrentMonthT2
    });

    for (var i = 0; i < filterdataT2.length; i++) {
        arrayFilteredDataT2.push([filterdataT2[i].pcode, filterdataT2[i].avgtemp])
    }

    mapMakerT2(filterdataT2, arrayFilteredDataT2);
}

function mapMakerT2(mapData, arrayData) {

    var onlyValues = arrayData.map(function (obj) {
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
//        .range(["#4e8dbd", "#fafafa", "#ff2700"]); // blue color
        .range(["#0400ff", "#009BFF", "#00d4ff", "#00ff10", "#d7ff00", "#FFa000", "#FF5a00", "#FF1e00", "#FF0040"]); // blue color


    function tooltipHtml(n, d) {    /* function to create html content string in tooltip div. */

        return ['<div>',
            '<strong>', n, '</strong>',
            '<br>Temperature: <strong>', d.value, '</strong>',
            '</div>'].join('')
    }

    var sampleData = {};

    var pcodeArray = ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
        "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH",
        "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT",
        "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN",
        "WI", "MO", "AR", "OK", "KS", "LS", "VA"];

    var filterpcode = [];
    filterpcode = pcodeArray;

    arrayData.forEach(function(d){
        filterpcode.splice(filterpcode.indexOf(d[0]),1);
        filterpcode.splice()
        sampleData[d[0]] = {
            value: d[1],
//            color: d3.interpolate("#4e8dbd", "#ff2700")(d[1] / 100)
            color: paletteScale(d[1])
        }
    });

    if(filterpcode.length>0){
        filterpcode.forEach(function(d){
            sampleData[d] = {
                value: "NA",
                color: "#ffffff"
            }
        })
    }

    /* draw states on id #statesvg */
    uStates.draw("#statesvg", sampleData, tooltipHtml, paletteScale);
}