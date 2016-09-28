/**
 * Created by Madhu on 5/3/16.
 */
/**
 * Created by Madhu on 5/1/16.
 */


var yearsT4 = ["All years"];
var arrayFilteredData = [];
var filteredUSAJSONT4 = [];


for (var y = 1900; y < 2014; y++) {
    yearsT4.push(y)
}
var monthsT4 = ["All Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
    "December"];

var stateT4 = [
    { name: "All States", code: "all"},
    { name: "Alabama", code: "AL"},
    { name: "Alaska", code: "AK"},
    { name: "Arizona", code: "AZ"},
    { name: "Arkansas", code: "AR"},
    { name: "California", code: "CA"},
    { name: "Colorado", code: "CO"},
    { name: "Connecticut", code: "CT"},
    { name: "Delaware", code: "DE"},
    { name: "District Of Columbia", code: "DC"},
    { name: "Florida", code: "FL"},
    { name: "Georgia", code: "GA"},
    { name: "Hawaii", code: "HI"},
    { name: "Idaho", code: "ID"},
    { name: "Illinois", code: "IL"},
    { name: "Indiana", code: "IN"},
    { name: "Iowa", code: "IA"},
    { name: "Kansas", code: "KS"},
    { name: "Kentucky", code: "KY"},
    { name: "Louisiana", code: "LS"},
    { name: "Maine", code: "ME"},
    { name: "Maryland", code: "MD"},
    { name: "Massachusetts", code: "MA"},
    { name: "Michigan", code: "MI"},
    { name: "Minnesota", code: "MN"},
    { name: "Mississippi", code: "MS"},
    { name: "Missouri", code: "MO"},
    { name: "Montana", code: "MT"},
    { name: "Nebraska", code: "NE"},
    { name: "Nevada", code: "NV"},
    { name: "New Hampshire", code: "NH"},
    { name: "New Jersey", code: "NJ"},
    { name: "New Mexico", code: "NM"},
    { name: "New York", code: "NY"},
    { name: "North Carolina", code: "NC"},
    { name: "North Dakota", code: "ND"},
    { name: "Ohio", code: "OH"},
    { name: "Oklahoma", code: "OK"},
    { name: "Oregon", code: "OR"},
    { name: "Pennsylvania", code: "PA"},
    { name: "Rhode Island", code: "RI"},
    { name: "South Carolina", code: "SC"},
    { name: "South Dakota", code: "SD"},
    { name: "Tennessee", code: "TN"},
    { name: "Texas", code: "TX"},
    { name: "Utah", code: "UT"},
    { name: "Vermont", code: "VT"},
    { name: "Virginia", code: "VA"},
    { name: "Washington", code: "WA"},
    { name: "West Virginia", code: "WV"},
    { name: "Wisconsin", code: "WI"},
    { name: "Wyoming", code: "WY"}
];

var groupT4 = [
    {name: "State", value: "code"},
    {name: "Year", value: "year"},
    {name: "Month", value: "monthfname"}
];

var selectYearT4 = document.getElementById("selectYearT4");
var selectMonthT4 = document.getElementById("selectMonthT4");
var selectStateT4 = document.getElementById("selectStateT4");
var selectGroupT4 = document.getElementById("selectGroupT4");

for (var i = 0; i < yearsT4.length; i++) {
    var opt = yearsT4[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectYearT4.appendChild(el);
}

for (var i = 0; i < monthsT4.length; i++) {
    var mname = monthsT4[i];
    var op = document.createElement("option");
    op.textContent = mname;
    op.value = mname;
    selectMonthT4.appendChild(op);
}

for (var i = 0; i < stateT4.length; i++) {
    var cname = stateT4[i].name;
    var cop = document.createElement("option");
    cop.textContent = cname;
    cop.value = stateT4[i].code;
    selectStateT4.appendChild(cop);
}

for (var i = 0; i < groupT4.length; i++) {
    var gname = groupT4[i].name;
    var gop = document.createElement("option");
    gop.textContent = gname;
    gop.value = groupT4[i].value;
    selectGroupT4.appendChild(gop);
}

var currentYearT4 = yearsT4[0];
var currentMonthT4 = monthsT4.indexOf(monthsT4[0]);
var currentStateT4 = stateT4[0].code;
var currentGroupT4 = groupT4[0].value;

var query_makerT4 = {};

function filterdataEngineT4(value, type) {
    if (type == 1) {
        currentYearT4 = value;
    } else if (type == 2) {
        currentMonthT4 = monthsT4.indexOf(value);
    } else {
        currentStateT4 = value;
    }
    console.log(currentStateT4)
    console.log(currentMonthT4)
    console.log(currentYearT4)

    query_makerT4 = {};
    if (currentStateT4 != "all") {
        query_makerT4["code"] = currentStateT4;
    }
    if (currentMonthT4 > 0) {
        query_makerT4["month"] = currentMonthT4;
    }
    if (currentYearT4 != "All years") {
        query_makerT4["year"] = currentYearT4;
    }

    dataMakerT4(filteredUSAJSONT4, "nodata")
}

d3.csv("../data/tempByStates.csv", function (error, data) {
    filteredUSAJSONT4 = data;
    if (filteredUSAJSONT4.length > 1) {
        filterdataEngineT4(yearsT4[0], 1);
    }
});


function filterGroupEngineT4(value) {
    if (filterUSAData.length == 0) {
        dataMakerT4(filteredUSAJSONT4, value)
    }
    else {
        currentGroupT4 = value;
        var groupUSAData = [];
        var grpCount = 0;
        var uniqueGrp = [];
        for (var i = 0; i < filterUSAData.length; i++) {
            var grpIndex = uniqueGrp.indexOf(filterUSAData[i][value]);
            if (grpIndex > -1) {
                groupUSAData[grpIndex]["avgtemp"] = parseInt(groupUSAData[grpIndex]["avgtemp"]) + parseInt(filterUSAData[i]["avgtemp"]);
                groupUSAData[grpIndex]["ct"]++;
            }
            else {
                uniqueGrp.push(filterUSAData[i][value]);
                groupUSAData.push(filterUSAData[i]);
                groupUSAData[grpCount]["ct"] = 1;
                grpCount++;
            }
        }
        for (var i = 0; i < groupUSAData.length; i++) {
            groupUSAData[i]["avgtemp"] = parseInt(groupUSAData[i]["avgtemp"]) / parseInt(groupUSAData[i]["ct"]);
        }
        console.log(groupUSAData.length)
        console.log(value)
        console.log(filterUSAData.length)
        barChartMaker2("deepdownUSAId", "tooltipT4", groupUSAData, value, "avgtemp");
    }
}

var filterUSAData = [];

function dataMakerT4(cdata, check) {
    console.log(query_makerT4.code)
    console.log(cdata.length)
    filterUSAData = $(cdata).filter(function (i, n) {
        if (query_makerT4.code) {
            if (query_makerT4.month) {
                if (query_makerT4.year) {
                    return n.year === query_makerT4.year.toString() && n.month === query_makerT4.month.toString() && n.pcode === query_makerT4.code
                } else {
                    return n.month === query_makerT4.month.toString() && n.pcode === query_makerT4.code
                }
            } else {
                if (query_makerT4.year) {
                    return n.year === query_makerT4.year.toString() && n.pcode === query_makerT4.code
                } else {
                    return n.pcode === query_makerT4.code
                }
            }
        } else {
            if (query_makerT4.month) {
                if (query_makerT4.year) {
                    return n.year === query_makerT4.year.toString() && n.month === query_makerT4.month.toString()
                } else {
                    return n.month === query_makerT4.month.toString()
                }
            } else {
                if (query_makerT4.year) {
                    return n.year === query_makerT4.year.toString()
                } else {
                    return true;
                }
            }
        }
    });
    console.log(currentGroupT4)
    if (check != "nodata") {
        currentGroupT4 = check;
    }
    filterGroupEngineT4(currentGroupT4)
}

function groupMaker() {

}


