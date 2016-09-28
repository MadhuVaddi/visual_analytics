/**
 * Created by Madhu on 5/1/16.
 */


var yearsT3 = ["All years"];
var arrayFilteredData = [];
var filteredWorldJSONT3 = [];

//console.log(filteredWorldJSON.length)

for (var y = 1900; y < 2014; y++) {
    yearsT3.push(y)
}
var monthsT3 = ["All Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November",
    "December"];

var countryT3 = [
    { name: "All Countries", code: "all"},
    { name: "Afghanistan", code: "AFG"},
    { name: "Albania", code: "ALB"},
    { name: "Algeria", code: "DZA"},
    { name: "American Samoa", code: "ASM"},
    { name: "Andorra", code: "AND"},
    { name: "Angola", code: "AGO"},
    { name: "Anguilla", code: "AIA"},
    { name: "Antigua And Barbuda", code: "ATG"},
    { name: "Argentina", code: "ARG"},
    { name: "Armenia", code: "ARM"},
    { name: "Aruba", code: "ABW"},
    { name: "Australia", code: "AUS"},
    { name: "Austria", code: "AUT"},
    { name: "Azerbaijan", code: "AZE"},
    { name: "Bahamas", code: "BHS"},
    { name: "Bahrain", code: "BHR"},
    { name: "Bangladesh", code: "BGD"},
    { name: "Barbados", code: "BRB"},
    { name: "Belarus", code: "BLR"},
    { name: "Belgium", code: "BEL"},
    { name: "Belize", code: "BLZ"},
    { name: "Benin", code: "BEN"},
    { name: "Bhutan", code: "BTN"},
    { name: "Bolivia", code: "BOL"},
    { name: "Bonaire, Saint Eustatius And Saba", code: "BES"},
    { name: "Bosnia And Herzegovina", code: "BIH"},
    { name: "Botswana", code: "BWA"},
    { name: "Brazil", code: "BRA"},
    { name: "British Virgin Islands", code: "VGB"},
    { name: "Bulgaria", code: "BGR"},
    { name: "Burkina Faso", code: "BFA"},
    { name: "Burma", code: "MMR"},
    { name: "Burundi", code: "BDI"},
    { name: "CÃ´te D'Ivoire", code: "CIV"},
    { name: "Cambodia", code: "KHM"},
    { name: "Cameroon", code: "CMR"},
    { name: "Canada", code: "CAN"},
    { name: "Cape Verde", code: "CPV"},
    { name: "Cayman Islands", code: "CYM"},
    { name: "Central African Republic", code: "CAF"},
    { name: "Chad", code: "TCD"},
    { name: "Chile", code: "CHL"},
    { name: "China", code: "CHN"},
    { name: "Christmas Island", code: "CXR"},
    { name: "Colombia", code: "COL"},
    { name: "Comoros", code: "COM"},
    { name: "Congo (Democratic Republic Of The)", code: "COD"},
    { name: "Congo", code: "COG"},
    { name: "Costa Rica", code: "CRI"},
    { name: "Croatia", code: "HRV"},
    { name: "Cuba", code: "CUB"},
    { name: "Cyprus", code: "CYP"},
    { name: "Czech Republic", code: "CZE"},
    { name: "Denmark", code: "DNK"},
    { name: "Djibouti", code: "DJI"},
    { name: "Dominica", code: "DMA"},
    { name: "Dominican Republic", code: "DOM"},
    { name: "Ecuador", code: "ECU"},
    { name: "Egypt", code: "EGY"},
    { name: "El Salvador", code: "SLV"},
    { name: "Equatorial Guinea", code: "GNQ"},
    { name: "Eritrea", code: "ERI"},
    { name: "Estonia", code: "EST"},
    { name: "Ethiopia", code: "ETH"},
    { name: "Falkland Islands (Islas Malvinas)", code: "FLK"},
    { name: "Faroe Islands", code: "FRO"},
    { name: "Fiji", code: "FJI"},
    { name: "Finland", code: "FIN"},
    { name: "France", code: "FRA"},
    { name: "French Guiana", code: "GUF"},
    { name: "French Polynesia", code: "PYF"},
    { name: "Gabon", code: "GAB"},
    { name: "Gambia", code: "GMB"},
    { name: "Georgia", code: "GEO"},
    { name: "Germany", code: "DEU"},
    { name: "Ghana", code: "GHA"},
    { name: "Greece", code: "GRC"},
    { name: "Greenland", code: "GRL"},
    { name: "Grenada", code: "GRD"},
    { name: "Guadeloupe", code: "GLP"},
    { name: "Guatemala", code: "GTM"},
    { name: "Guernsey", code: "GGY"},
    { name: "Guinea Bissau", code: "GNB"},
    { name: "Guinea", code: "GIN"},
    { name: "Guyana", code: "GUY"},
    { name: "Haiti", code: "HTI"},
    { name: "Honduras", code: "HND"},
    { name: "Hong Kong", code: "HKG"},
    { name: "Hungary", code: "HUN"},
    { name: "Iceland", code: "ISL"},
    { name: "India", code: "IND"},
    { name: "Indonesia", code: "IDN"},
    { name: "Iran", code: "IRN"},
    { name: "Iraq", code: "IRQ"},
    { name: "Ireland", code: "IRL"},
    { name: "Isle Of Man", code: "IMN"},
    { name: "Israel", code: "ISR"},
    { name: "Italy", code: "ITA"},
    { name: "Jamaica", code: "JAM"},
    { name: "Japan", code: "JPN"},
    { name: "Jersey", code: "JEY"},
    { name: "Jordan", code: "JOR"},
    { name: "Kazakhstan", code: "KAZ"},
    { name: "Kenya", code: "KEN"},
    { name: "Kiribati", code: "KIR"},
    { name: "Kuwait", code: "KWT"},
    { name: "Kyrgyzstan", code: "KGZ"},
    { name: "Laos", code: "LAO"},
    { name: "Latvia", code: "LVA"},
    { name: "Lebanon", code: "LBN"},
    { name: "Lesotho", code: "LSO"},
    { name: "Liberia", code: "LBR"},
    { name: "Libya", code: "LBY"},
    { name: "Liechtenstein", code: "LIE"},
    { name: "Lithuania", code: "LTU"},
    { name: "Luxembourg", code: "LUX"},
    { name: "Macau", code: "MAC"},
    { name: "Macedonia", code: "MKD"},
    { name: "Madagascar", code: "MDG"},
    { name: "Malawi", code: "MWI"},
    { name: "Malaysia", code: "MYS"},
    { name: "Mali", code: "MLI"},
    { name: "Malta", code: "MLT"},
    { name: "Martinique", code: "MTQ"},
    { name: "Mauritania", code: "MRT"},
    { name: "Mauritius", code: "MUS"},
    { name: "Mayotte", code: "MYT"},
    { name: "Mexico", code: "MEX"},
    { name: "Moldova", code: "MDA"},
    { name: "Monaco", code: "MCO"},
    { name: "Mongolia", code: "MNG"},
    { name: "Montenegro", code: "MNE"},
    { name: "Montserrat", code: "MSR"},
    { name: "Morocco", code: "MAR"},
    { name: "Mozambique", code: "MOZ"},
    { name: "Namibia", code: "NAM"},
    { name: "Nepal", code: "NPL"},
    { name: "Netherlands", code: "NLD"},
    { name: "New Caledonia", code: "NCL"},
    { name: "New Zealand", code: "NZL"},
    { name: "Nicaragua", code: "NIC"},
    { name: "Niger", code: "NER"},
    { name: "Nigeria", code: "NGA"},
    { name: "Niue", code: "NIU"},
    { name: "North Korea", code: "PRK"},
    { name: "Norway", code: "NOR"},
    { name: "Oman", code: "OMN"},
    { name: "Pakistan", code: "PAK"},
    { name: "Palestina", code: "PSE"},
    { name: "Panama", code: "PAN"},
    { name: "Papua New Guinea", code: "PNG"},
    { name: "Paraguay", code: "PRY"},
    { name: "Peru", code: "PER"},
    { name: "Philippines", code: "PHL"},
    { name: "Poland", code: "POL"},
    { name: "Portugal", code: "PRT"},
    { name: "Puerto Rico", code: "PRI"},
    { name: "Qatar", code: "QAT"},
    { name: "Reunion", code: "REU"},
    { name: "Romania", code: "ROU"},
    { name: "Russia", code: "RUS"},
    { name: "Rwanda", code: "RWA"},
    { name: "Saint Kitts And Nevis", code: "KNA"},
    { name: "Saint Lucia", code: "LCA"},
    { name: "Saint Pierre And Miquelon", code: "SPM"},
    { name: "Saint Vincent And The Grenadines", code: "VCT"},
    { name: "Samoa", code: "WSM"},
    { name: "San Marino", code: "SMR"},
    { name: "Sao Tome And Principe", code: "STP"},
    { name: "Saudi Arabia", code: "SAU"},
    { name: "Senegal", code: "SEN"},
    { name: "Serbia", code: "SRB"},
    { name: "Seychelles", code: "SYC"},
    { name: "Sierra Leone", code: "SLE"},
    { name: "Singapore", code: "SGP"},
    { name: "Sint Maarten", code: "SXM"},
    { name: "Slovakia", code: "SVK"},
    { name: "Slovenia", code: "SVN"},
    { name: "Solomon Islands", code: "SLB"},
    { name: "Somalia", code: "SOM"},
    { name: "South Africa", code: "ZAF"},
    { name: "South Georgia And The South Sandwich Isla", code: "SGS"},
    { name: "South Korea", code: "KOR"},
    { name: "Spain", code: "ESP"},
    { name: "Sri Lanka", code: "LKA"},
    { name: "Sudan", code: "SDN"},
    { name: "Suriname", code: "SUR"},
    { name: "Svalbard And Jan Mayen", code: "SJM"},
    { name: "Swaziland", code: "SWZ"},
    { name: "Sweden", code: "SWE"},
    { name: "Switzerland", code: "CHE"},
    { name: "Syria", code: "SYR"},
    { name: "Taiwan", code: "TWN"},
    { name: "Tajikistan", code: "TJK"},
    { name: "Tanzania", code: "TZA"},
    { name: "Thailand", code: "THA"},
    { name: "Timor Leste", code: "TLS"},
    { name: "Togo", code: "TGO"},
    { name: "Tonga", code: "TON"},
    { name: "Trinidad And Tobago", code: "TTO"},
    { name: "Tunisia", code: "TUN"},
    { name: "Turkey", code: "TUR"},
    { name: "Turkmenistan", code: "TKM"},
    { name: "Turks And Caicas Islands", code: "TCA"},
    { name: "Uganda", code: "UGA"},
    { name: "Ukraine", code: "UKR"},
    { name: "United Arab Emirates", code: "ARE"},
    { name: "United Kingdom", code: "GBR"},
    { name: "United States", code: "USA"},
    { name: "Uruguay", code: "URY"},
    { name: "Uzbekistan", code: "UZB"},
    { name: "Venezuela", code: "VEN"},
    { name: "Vietnam", code: "VNM"},
    { name: "Western Sahara", code: "ESH"},
    { name: "Yemen", code: "YEM"},
    { name: "Zambia", code: "ZMB"},
    { name: "Zimbabwe", code: "ZWE"},
    { name: "Palau", code: "PLW"},
    { name: "Federated States Of Micronesia", code: "FSM"},
    { name: "Guam", code: "GUM"},
    { name: "Northern Mariana Islands", code: "MNP"},
    { name: "French Southern And Antarctic Lands", code: "ATF"},
    { name: "Heard Island And Mcdonald Islands", code: "HMD"}
]

var groupT3 = [
    {name: "Country", value: "code"},
    {name: "Year", value: "year"},
    {name: "Month", value: "monthfname"}
];

var selectYearT3 = document.getElementById("selectYearT3");
var selectMonthT3 = document.getElementById("selectMonthT3");
var selectCountryT3 = document.getElementById("selectCountryT3");
var selectGroupT3 = document.getElementById("selectGroupT3");

for (var i = 0; i < yearsT3.length; i++) {
    var opt = yearsT3[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectYearT3.appendChild(el);
}

for (var i = 0; i < monthsT3.length; i++) {
    var mname = monthsT3[i];
    var op = document.createElement("option");
    op.textContent = mname;
    op.value = mname;
    selectMonthT3.appendChild(op);
}

for (var i = 0; i < countryT3.length; i++) {
    var cname = countryT3[i].name;
    var cop = document.createElement("option");
    cop.textContent = cname;
    cop.value = countryT3[i].code;
    selectCountryT3.appendChild(cop);
}

for (var i = 0; i < groupT3.length; i++) {
    var gname = groupT3[i].name;
    var gop = document.createElement("option");
    gop.textContent = gname;
    gop.value = groupT3[i].value;
    selectGroupT3.appendChild(gop);
}

var currentYearT3 = yearsT3[0];
var currentMonthT3 = monthsT3.indexOf(monthsT3[0]);
var currentCountryT3 = countryT3[0].code;
var currentGroupT3 = groupT3[0].value;

var previosYearT3 = "";
var previosMonthT3 = "";
var previosCountryT3 = "";
var query_makerT3 = {};

function filterdataEngineT3(value, type) {
    if (type == 1) {
        currentYearT3 = value;
    } else if (type == 2) {
        currentMonthT3 = monthsT3.indexOf(value);
    } else {
        currentCountryT3 = value;
    }
    console.log(currentCountryT3)
    console.log(currentMonthT3)
    console.log(currentYearT3)

    query_makerT3 = {};
    if (currentCountryT3 != "all") {
        query_makerT3["code"] = currentCountryT3;
    }
    if (currentMonthT3 > 0) {
        query_makerT3["month"] = currentMonthT3;
    }
    if (currentYearT3 != "All years") {
        query_makerT3["year"] = currentYearT3;
    }

    dataMakerT3(filteredWorldJSONT3, "nodata")
}

d3.csv("../data/tempByCountries.csv", function (error, data) {
    filteredWorldJSONT3 = data;
    if (filteredWorldJSONT3.length > 1) {
        filterdataEngineT3(yearsT3[0], 1);
    }
});


var ndata = [
    {
        "date": "24-Apr-07",
        "price": 0.08167
    },
    {
        "letter": "24-Apr-08",
        "frequency": 0.01492
    }
];

//barChartMaker2("deepdownId", "tooltipT3", ndata, "letter", "frequency");

function filterGroupEngineT3(value) {
    if (filterWorldData.length == 0) {
        dataMakerT3(filteredWorldJSONT3, value)
    }
    else {
        currentGroupT3 = value;
        var groupWorldData = [];
        var grpCount = 0;
        var uniqueGrp = [];
        for (var i = 0; i < filterWorldData.length; i++) {
            var grpIndex = uniqueGrp.indexOf(filterWorldData[i][value]);
            if (grpIndex > -1) {
                groupWorldData[grpIndex]["avgtemp"] = parseInt(groupWorldData[grpIndex]["avgtemp"]) + parseInt(filterWorldData[i]["avgtemp"]);
                groupWorldData[grpIndex]["ct"]++;
            }
            else {
                uniqueGrp.push(filterWorldData[i][value]);
                groupWorldData.push(filterWorldData[i]);
                groupWorldData[grpCount]["ct"] = 1;
                grpCount++;
            }
        }
        for (var i = 0; i < groupWorldData.length; i++) {
            groupWorldData[i]["avgtemp"] = parseInt(groupWorldData[i]["avgtemp"]) / parseInt(groupWorldData[i]["ct"]);
        }
        console.log(groupWorldData)
        console.log(value)
        console.log(filterWorldData.length)
        barChartMaker2("deepdownId", "tooltipT3", groupWorldData, value, "avgtemp");
    }
}

var filterWorldData = [];

function dataMakerT3(cdata, check) {
    console.log(query_makerT3.code)
    console.log(cdata.length)
    filterWorldData = $(cdata).filter(function (i, n) {
        if (query_makerT3.code) {
            if (query_makerT3.month) {
                if (query_makerT3.year) {
                    return n.year === query_makerT3.year.toString() && n.month === query_makerT3.month.toString() && n.code === query_makerT3.code
                } else {
                    return n.month === query_makerT3.month.toString() && n.code === query_makerT3.code
                }
            } else {
                if (query_makerT3.year) {
                    return n.year === query_makerT3.year.toString() && n.code === query_makerT3.code
                } else {
                    return n.code === query_makerT3.code
                }
            }
        } else {
            if (query_makerT3.month) {
                if (query_makerT3.year) {
                    return n.year === query_makerT3.year.toString() && n.month === query_makerT3.month.toString()
                } else {
                    return n.month === query_makerT3.month.toString()
                }
            } else {
                if (query_makerT3.year) {
                    return n.year === query_makerT3.year.toString()
                } else {
                    return true;
                }
            }
        }
    });
    console.log(currentGroupT3)
    if(check != "nodata"){
        currentGroupT3 = check;
    }
    filterGroupEngineT3(currentGroupT3)
}

function groupMaker() {

}


