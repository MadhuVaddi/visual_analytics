/**
 * Created by Madhu on 5/3/16.
 */

var marginT5 = {top: 10, right: 10, bottom: 100, left: 40},
    marginT52 = {top: 430, right: 10, bottom: 20, left: 40},
    widthT5 = 960 - marginT5.left - marginT5.right,
    heightT5 = 500 - marginT5.top - marginT5.bottom,
    heightT52 = 500 - marginT52.top - marginT52.bottom;

var parseDateT5 = d3.time.format("%b %Y").parse;

var xT5 = d3.time.scale().range([0, widthT5]),
    xT52 = d3.time.scale().range([0, widthT5]),
    yT5 = d3.scale.linear().range([heightT5, 0]),
    yT52 = d3.scale.linear().range([heightT52, 0]);

var xAxisT5 = d3.svg.axis().scale(xT5).orient("bottom"),
    xAxisT52 = d3.svg.axis().scale(xT52).orient("bottom"),
    yAxisT5 = d3.svg.axis().scale(yT5).orient("left");

var bisectDate = d3.bisector(function(d) { return d.date; }).left;

var brushT5 = d3.svg.brush()
    .x(xT52)
    .on("brush", brushed);

var areaT5 = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) {
        return xT5(d.date);
    })
    .y0(heightT5)
    .y1(function (d) {
        return yT5(d.LandAverageTemperature);
    });

var areaT52 = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) {
        return xT52(d.date);
    })
    .y0(heightT52)
    .y1(function (d) {
        return yT52(d.LandAverageTemperature);
    });

var areaT5max = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) {
        return xT5(d.date);
    })
    .y0(heightT5)
    .y1(function (d) {
        return yT5(d.LandMaxTemperature);
    });

var areaT52max = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) {
        return xT52(d.date);
    })
    .y0(heightT52)
    .y1(function (d) {
        return yT52(d.LandMaxTemperature);
    });

var areaT5min = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) {
        return xT5(d.date);
    })
    .y0(heightT5)
    .y1(function (d) {
        return yT5(d.LandMinTemperature);
    });

var areaT52min = d3.svg.area()
    .interpolate("monotone")
    .x(function (d) {
        return xT52(d.date);
    })
    .y0(heightT52)
    .y1(function (d) {
        return yT52(d.LandMinTemperature);
    });

var svgT5 = d3.select("#allId").append("svg")
    .attr("width", 1100)
    .attr("height", heightT5 + marginT5.top + marginT5.bottom);

var div = d3.select("#allId").append("div")
    .attr("class", "tooltipLineFocus")
    .style("opacity", 0);


svgT5.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", widthT5)
    .attr("height", heightT5);

var focusT5 = svgT5.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + marginT5.left + "," + marginT5.top + ")");

var contextT5 = svgT5.append("g")
    .attr("class", "context")
    .attr("transform", "translate(" + marginT52.left + "," + marginT52.top + ")");

d3.csv("../data/tempByAll.csv", type, function (error, data) {
    console.log(data[0])
    xT5.domain(d3.extent(data.map(function (d) {
        return d.date;
    })));
    yT5.domain([d3.min(data.map(function (d) {
        return d.LandMinTemperature;
    })), d3.max(data.map(function (d) {
        return d.LandMaxTemperature;
    }))]);
    xT52.domain(xT5.domain());
    yT52.domain(yT5.domain());

    focusT5.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", areaT5);

    focusT5.append("path")
        .datum(data)
        .attr("class", "areamax")
        .attr("d", areaT5max);

    focusT5.append("path")
        .datum(data)
        .attr("class", "areamin")
        .attr("d", areaT5min);

    focusT5.append("rect")
        .attr("class", "overlay")
        .attr("width", widthT5)
        .attr("height", heightT5)
        .on("mouseover", mouseovering)
        .on("mouseout", mouseouting)
        .on("mousemove", mouseovering);

    function mouseovering() {
        var x0 = xT5.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div .html("<strong>"+ d.monthname +" " + d.year+"</strong>" + "<br/>"  + "Max Temp: <strong>"+ Math.round(d.LandMaxTemperature*100)/100+"</strong><br/>"
                    + "Average Temp: <strong>"+ Math.round(d.LandAverageTemperature*100)/100 +"</strong><br/>Min Temp: <strong>"+ Math.round(d.LandMinTemperature*100)/100+"</strong>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
    }

    function mouseouting() {
//        var x0 = xT5.invert(d3.mouse(this)[0]),
//            i = bisectDate(data, x0, 1),
//            d0 = data[i - 1],
//            d1 = data[i],
//            d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            div.transition()
                .duration(500)
                .style("opacity", 0);
    }

//        .on("mouseover", function(d) {
//            console.log(this)
//            div.transition()
//                .duration(200)
//                .style("opacity", .9);
//            div .html("<strong>"+ d.date+"</strong>" + "<br/>"  + "Max Temp: <strong>"+ d.LandMaxTemperature+"</strong><br/>"
//                    + "Average Temp: <strong>"+ d.LandAverageTemperature+"</strong><br/>Min Temp: <strong>"+ d.LandMinTemperature+"</strong>")
//                .style("left", (d3.event.pageX) + "px")
//                .style("top", (d3.event.pageY - 28) + "px");
//        })
//        .on("mouseout", function(d) {
//            div.transition()
//                .duration(500)
//                .style("opacity", 0);
//        });

    focusT5.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightT5 + ")")
        .call(xAxisT5)
        .append("text")
        .attr("class", "label")
        .attr("x", widthT5)
        .attr("y", 30)
        .style("text-anchor", "end")
        .text("Year");


    focusT5.append("g")
        .attr("class", "y axis")
        .call(yAxisT5)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Land Temperatures");

    contextT5.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", areaT52);

    contextT5.append("path")
        .datum(data)
        .attr("class", "areamax")
        .attr("d", areaT52max);

    contextT5.append("path")
        .datum(data)
        .attr("class", "areamin")
        .attr("d", areaT52min);

    contextT5.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + heightT52 + ")")
        .call(xAxisT52)

    contextT5.append("rect")
        .attr("class", "overlay")
        .selectAll("rect");

    contextT5.append("g")
        .attr("class", "x brush")
        .call(brushT5)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", heightT52 + 7);

    var colors = [
        {name: "Max Temp", color: "#FF5a00"},
        {name: "Average Temp", color: "#d7ff00"},
        {name: "Min Temp", color: "#009BFF"}
    ];

//    // draw legend
    var legend = svgT5.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(80," + (-300 + i * 40) + ")";
        });



//    draw legend colored rectangles
    legend.append("rect")
        .attr("x", widthT5 - 9)
        .attr("y", heightT5 - 9)
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", function(d){
            return d.color;
        })
        .style("stroke", "#000000")
        .style("opacity", 0.5);


//    draw legend text
    legend.append("text")
        .attr("x", widthT5 + 20)
        .attr("y", heightT5 - 2)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function (d) {
            return d.name;
        })
});

function brushed() {
    xT5.domain(brushT5.empty() ? xT52.domain() : brushT5.extent());
    focusT5.select(".area").attr("d", areaT5);
    focusT5.select(".areamax").attr("d", areaT5max);
    focusT5.select(".areamin").attr("d", areaT5min);
    focusT5.select(".x.axis").call(xAxisT5);
}

function type(d) {
    console.log(d.date)
    d.date = parseDateT5(d.date);
    d.LandAverageTemperature = +d.LandAverageTemperature;
    d.LandMaxTemperature = +d.LandMaxTemperature;
    d.LandMinTemperature = +d.LandMinTemperature;
    return d;
}
/**
 * Created by Madhu on 5/3/16.
 */
