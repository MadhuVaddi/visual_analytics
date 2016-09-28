/**
 * Created by Madhu on 5/2/16.
 */
function barChartMaker2(id, tid, dataset, xVar, yVar) {

    //Set width and height as fixed variables
    document.getElementById(id).innerHTML = "";

    var w = 960;
    var h = 500;
    var padding = 25;

    //Scale function for axes and radius
    var yScale = d3.scale.linear()
        .domain(d3.extent(dataset, function (d) {
            return d[yVar];
        }))
        .range([h + padding, padding]);
    if (dataset.length == 1) {
        var obj = {};
        obj[xVar] = "lol";
        obj[yVar] = 0;
        var dataset1 = [];
        dataset1.push(dataset[0]);
        dataset1.push(obj);
        yScale = d3.scale.linear()
            .domain(d3.extent(dataset1, function (d) {
                return d[yVar];
            }))
            .range([h + padding, padding]);
    }

    var xScale = d3.scale.ordinal()
        .domain(dataset.map(function (d) {
            return d[xVar];
        }))
        .rangeRoundBands([padding, w + padding], .5);

    //To format axis as a percent
    var formatPercent = d3.format("%1");

    //Create y axis
    var yAxis = d3.svg.axis().scale(yScale).orient("left");

    //Define key function
    var key = function (d) {
        return d[xVar]
    };

    //Define tooltip for hover-over info windows
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var margin = {top: 20, right: 20, bottom: 60, left: 40};

    function tooltipHtmlT3(n) {    /* function to create html content string in tooltip div. */
        return ['<div>',
            '<strong>', n[(xVar == "code") ? (parseInt(n["code"])?"state":"country") : xVar], '</strong>',
            '<br>Temperature:<strong>', Math.round(n[yVar] * 100) / 100, '</strong>',
            '</div>'].join('')
    }

    var svg = d3.select("#" + id).append("svg")
        .attr("width", 1100)
        .attr("height", h + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Create barchart
    svg.selectAll("rect")
        .data(dataset, key)
        .enter()
        .append("rect")
        .attr("class", function (d) {
            return d[yVar] < 0 ? "negative" : "positive";
        })
        .attr({
            x: function (d) {
                return xScale(d[xVar]);
            },
            y: function (d) {
                return yScale(Math.max(0, d[yVar]));
            },
            width: xScale.rangeBand(),
            height: function (d) {
                return Math.abs(yScale(d[yVar]) - yScale(0));
            }
        })
        .on('mouseover', function (d) {
            d3.select(this)
                .style("opacity", 0.2);

            d3.select("#" + tid).transition().style("opacity", 1);

            d3.select("#" + tid).html(tooltipHtmlT3(d))
                .style("left", (d3.event.pageX - 100) + "px")
                .style("top", (d3.event.pageY - 100) + "px");
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .style("opacity", 1);
            d3.select("#" + tid).transition().style("opacity", 0);

        });

    //Add y-axis
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Land Average Temperature");


    var colors = [
        {name: "< 0", color: "#009BFF"},
        {name: "> 0", color: "#FF5a00"}
    ];

//    // draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(30," + (-400 + i * 40) + ")";
        });



//    draw legend colored rectangles
    legend.append("rect")
        .attr("x", w - 9)
        .attr("y", h - 9)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d){
            return d.color;
        })
        .style("stroke", "#000000")
        .style("opacity", 0.5);


//    draw legend text
    legend.append("text")
        .attr("x", w + 20)
        .attr("y", h - 2)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-size", "15px")
        .text(function (d) {
            return d.name;
        })

}