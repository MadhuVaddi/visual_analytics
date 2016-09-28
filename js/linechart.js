/**
 * Created by Madhu on 5/2/16.
 */

function lineChartMaker(id, tid, data, xVar, yVar) {
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatDate = d3.time.format("%d-%b-%y");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d[xVar]);
        })
        .y(function (d) {
            return y(d[yVar]);
        });

    var svg = d3.select("#"+id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    x.domain(d3.extent(data, function (d) {
        return d[xVar];
    }));
    y.domain(d3.extent(data, function (d) {
        return d[yVar];
    }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Price ($)");

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    function type(d) {
//        d.date = formatDate.parse(d.date);
        d[yVar] = +d[yVar];
        return d;
    }
}

function lineChartmaker1(){
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y").parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function (d) {
            return x(d.date);
        })
        .y(function (d) {
            return y(d.count);
        });

    var svg = d3.select("#line").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var dataYear = function (d) {
        return +d.Year;
    };
    var new_data = [[], []];

    var focus = svg.append("g")
        .style("display", "none");


        var max_year = d3.max(data, dataYear);
        var min_year = d3.min(data, dataYear) - 1;

        for (var i = min_year; i < max_year + 1; i++) {
            var tmp1 = [];
            var tmp2 = [];

            new_data[0].push(tmp1);
            new_data[1].push(tmp2);
        }
        var max1 = d3.max(new_data[0], function (d) {
            return d.count;
        });
        var max2 = d3.max(new_data[1], function (d) {
            return d.count;
        });

        var axis_data = [];
        if (max1 > max2) {
            axis_data = new_data[0];
        }
        else {
            axis_data = new_data[1];
        }


        x.domain(d3.extent(new_data[0], function (d) {
            return d.date;
        }));
        y.domain(d3.extent(axis_data, function (d) {
            return d.count;
        }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("class", "label")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("count");

        var color = ["steelblue", "red"];
        var name = ["movies", "average popularity"];
        for (var i = 0; i < 2; i++) {
            svg.append("path")
                .datum(new_data[i])
                .attr("class", "line")
                .attr("stroke", color[i])
                .attr("fill", "none")
                .attr("d", line);

            svg.append("text")
                .datum(new_data[i][new_data[1].length - 1])
                .attr("class", "title")
                .attr("transform", function (d) {
                    return "translate(" + x(d.date) + "," + y(d.count) + ")";
                })
                .attr("x", 3)
                .attr("dy", ".15em")
                .style("text-anchor", "end")
                .text(name[i]);
        }

}