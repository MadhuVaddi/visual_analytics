var xVar = "year";
var yVar = "avgtemp";
var rVar = "avgtempuncert"
var parseDateT6 = d3.time.format("%b %Y").parse;

var margin = {top: 20, right: 100, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

/*
 * http://bl.ocks.org/weiglemc/6185069
 * value accessor - returns the value to encode for a given data object.
 * scale - maps value to a visual display encoding, such as a pixel position.
 * map function - maps from data value to display value
 * axis - sets up axis
 */

// add the graph canvas to the body of the webpage
var svg = d3.select("#uncertaintyId").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("#uncertaintyId").append("div")
    .attr("class", "tooltipScatter")
    .style("opacity", 0);

// load data
d3.csv("../data/tempByAllScatter1.csv", function (error, data) {
    // change string (from CSV) into number format
    data.forEach(function (d) {
        d[xVar] = +d[xVar];
        d[yVar] = +d[yVar];
    });

    var yScale = d3.scale.linear()
        .domain(d3.extent(data, function (d) {
            return d[yVar];
        }))
        .range([height, 0]);

    var xScale = d3.time.scale()
        .domain(data.map(function (d) {
            return d[xVar];
        }))
        .range([0, width], .5);

    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
    xAxis.tickFormat(d3.format('0f'));
    // don't want dots overlapping axis, so add in buffer to data domain
//    xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
//    yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);

    xScale.domain(d3.extent(data.map(function (d) {
        return d[xVar];
    })));

    yScale.domain([0, d3.max(data.map(function (d) {
        return d[yVar];
    }))]);

    // x-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text("Year");

    // y-axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Land Average Temperature");

    // draw dots
    svg.selectAll(".dot")
        .data(data)
        .enter().append("g")
        .attr("class", "dot")
        .append("circle")
        .attr("r", function (d) {
            var rd = (1 / d[rVar])+2;
            return rd;
        })
        .attr("cx", function (d) {
            return xScale(d[xVar])
        })
        .attr("cy", function (d) {
            return yScale(d[yVar])
        })
        .attr("class", function (d) {
            var accuracy = 1 / d[rVar];
            if (accuracy < 5) {
                return "circle_5 circleScatter";
            }
            if (accuracy >= 10) {
                return "circle_15 circleScatter";
            }
            else {
                return "circle_10 circleScatter";
            }
        })
        .style("fill", "#d3d3d3")
        .style("opacity", 0.6)
        .style("stroke", "#000000")
        .on("mouseover", function (d) {
            d3.select(this).transition().duration(200).style("opacity", 1).style("fill", "orangered");
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html("<strong>" + d[xVar] + "</strong><br/> Average Temperature: <strong>" + Math.round(1 / d[yVar] * 100) / 100
                    + "</strong><br/> Accuracy in Measurement: <strong>" + Math.round(1 / d[rVar] * 100) / 100 + "</strong>")
                .style("left", (d3.event.pageX - 80) + "px")
                .style("top", (d3.event.pageY - 40) + "px");

        })
        .on("mouseout", function (d) {
            d3.select(this).transition().duration(200).style("opacity", 0.6).style("fill", "#d3d3d3");
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        })

    var colors = [
        {name: 5},
        {name: 10},
        {name: 15}
    ];


//    // draw legend
    var legend = svg.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(50," + (-400 + i * 40) + ")";
        });


//    draw legend colored rectangles
    legend.append("circle")
        .attr("cx", width - 9)
        .attr("cy", height - 9)
        .attr("r", function (d) {
            return d.name;
        })
        .attr("class", function (d) {
            return "circle_"+d.name + " circleScatter";
        })
        .style("fill", "#d3d3d3")
        .style("stroke", "#000000")
        .style("opacity", 0.6)
        .on("mouseover", function(d){
            var class_name = ".circle_"+ d.name;
            d3.selectAll(class_name).transition().duration(500).style("fill", "red");
        })
        .on("mouseout",function(d){
            d3.selectAll(".circleScatter").transition().duration(500).style("fill", "#d3d3d3");
        });

//    draw legend text
    legend.append("text")
        .attr("x", width + 30)
        .attr("y", height - 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d.name;
        })
});
