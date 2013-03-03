function yearView() {

	$("#yearViewCanvas").empty();
	var width = 960, height = 186, cellSize = 17; // cell size

	var day = d3.time.format("%w"), // %w weekday as a decimal number
	// [0(Sunday),6].
	week = d3.time.format("%U"), // %U week number of the year (Sunday as the
	// first day of the week) as a decimal
	// number [00,53].
	/*
	 * day1 = function(d){ if(d3.time.format("%w")(d) == 0 ){ return "6"; } else
	 * if( d3.time.format("%w")(d) > 0 ){ return "d3.time.format("%w")(d)-1"; } },
	 * 
	 * week1 = function(d){ if( d3.time.format("%w")(d) == 0){ return
	 * "d3.time.format("%U")(d)-1"; } else if ( d3.time.format("%w")(d) >0 ){
	 * return d3.time.format("%U")(d); } },
	 */

	percent = d3.format(".1%"), format = d3.time.format("%Y-%m-%d");

	// mapping the values to colors
	var color = d3.scale.quantize() // quantize() ,output discrete range, the
	// mapping is linear
	.domain([ 0.0, 24.0 ]) // input domain
	.range(d3.range(11).map(function(d) {
		return "q" + d + "-11";
	})); // output range, discrete
	// # d3.range([start, ]stop[, step]), here the output is 0,1,2...,11, being
	// mapped by the function to another array
	// .map - Create a new array with the result of a function of every element
	// in the array.

	var svg = d3.select("#yearViewCanvas").selectAll("svg") // svg is whole rect
	// area to contain the
	// graph, including the
	// blank
	// .data(d3.range(1990, 2011))
	// .data(d3.range(2011, 2014))
	.data([ 2012, 2013 ]).enter().append("svg") // the existing selection is
	// empty, and we wish to create
	// new nodes to match our data:
	.attr("width", width) // each node is a svg with the preset width& height
	.attr("height", height).attr("class", "RdYlGn") // and class RdYlGn
	.append("g") // g,Used to group together elements, so this is the actual
	// grids we see
	.attr(
			"transform",
			"translate(" + ((width - cellSize * 53) / 2) + ","
					+ (height - cellSize * 7 - 1) + ")");
	// translate(x,y),is for moving a graph object;
	// this is actually the margins of the whole graph, (29.5,16)
	svg.append("text").attr("transform",
			"translate(-20," + cellSize * 3.5 + ")rotate(-90)").style(
			"text-anchor", "middle").text(function(d) {
		return d;
	}); // force the number to string, the d is every datum from the data

	svg.append("text").attr("transform", "translate(" + 2 * cellSize + ",-15)")
			.text("January");
	// the structure: svg(areas)->g(graphs)->rect(days)

	var rect = svg.selectAll(".day").data(function(d) {
		return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1));
	}) // d is from the data of svg, [2012,2013]
	// d3.time.days(start, stop[, step]), the return here are two arrays of the
	// days from year 2012,to year 2013, and 2013-2014
	// Date(year, month, day)
	// it gets every day from the year d to year d+1
	.enter().append("rect") // currently, the class .day is empty, here they
	// create nodes from every datum in the data
	.attr("class", "day").attr("width", cellSize).attr("height", cellSize)
			.attr("x", function(d) {
				if (day(d) == 0) {
					return (week(d) - 1) * cellSize;
				} else if (day(d) > 0) {
					return week(d) * cellSize;
				}

			}) // position of each grid, week = d3.time.format("%U")
			.attr("y", function(d) {
				if (day(d) == 0) {
					return 6 * cellSize;
				} else if (day(d) > 0) {
					return (day(d) - 1) * cellSize;
				}
			}) // day = d3.time.format("%w"), get the weekday number from the
			// datum
			.datum(format); // get the value from format, format =
	// d3.time.format("%Y-%m-%d")
	rect.append("title")
	// .text(function(d) { return d; });

	var monthBlock = svg.selectAll(".month").data(function(d) {
		return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1));
	})
	// d3.time.months(start, stop[, step]).
	// every first day of each month from year d to year d+1
	.enter().append("path").attr("class", "month").attr("d", monthPath); // set
	// the  border of a month on the graph, using the function monthPath

	monthBlock.append("text").attr("class", "monthLable").text("0");

	/*------------------------*/
	/* importing the data */
	/*----------------------*/
	// d3-array:https://github.com/mbostock/d3/wiki/Arrays
	// d3.csv("dataset/sample_data_v0.1.csv", function(csv) {
	// console.log(csv);
	// csv = calendarModel.totalBusyHours;
	// console.log(csv);
	var data = d3.nest() // Nesting reform the input array into an
	// hierarchical structure
	.key(function(d) {
		return d.date;
	}) // the key(function) controls the level rule in the tree
	.rollup(function(d) {
		return d[0].hours;
	})
	// .rollup(function(d) {
	// return d[1].hoursByColor;
	// })

	// The leaf level is replaced by a value at the parent level
	// formerly, the value of each key is an array of an object
	.map(calendarModel.totalBusyHours); // The return value of the rollup
	// function will replace the
	// array of leaf values in either the associative array
	// returned by the map operator, or
	// Applies the nest operator to the specified array, returning an
	// associative array.
	
	/*
	var test = d3.nest() 
	.key(function(d) {	return d.date;	})
	.rollup(function(d) {return d[0].hoursByColor;	})
	.map(calendarModel.totalBusyHours); 
*/


	// selector,filter:https://github.com/mbostock/d3/wiki/Selections#wiki-filter
	rect.filter(function(d) {
		return d in data;
	}) // Filters the selection, returning a new selection that contains
	// only the elements for which the specified selector is true.
	// rect - svg('.day')
	.attr("class", function(d) {
		return "day " + color(data[d]);
	}) // set the class of the grid to a particular color class according
	// to the value
	.select("title").text(function(d) {
		return d + " you are busy: " + data[d] + " hours";
	}); // set the busy hours to title

	// });
	function monthPath(t0) { // t0 is the first day of a month, t1 is the
		// last day of the month
		var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0), // new
		// Date(1990,0,0)
		// = the
		// previous
		// day of
		// 1990-1-1
		d0 = +day(t0), w0 = +week(t0), // the result of day(t0) is type of
		// string, = + make it into a number
		d1 = +day(t1), w1 = +week(t1); // week number also start with 0;
		if (d0 == 0) {
			return "M" + w0 * cellSize + "," + 6 * cellSize + "H" + (w0 - 1)
					* cellSize + "V" + 7 * cellSize + "H" + w1 * cellSize + "V"
					+ d1 * cellSize + "H" + (w1 + 1) * cellSize + "V" + 0 + "H"
					+ w0 * cellSize + "Z";
		} else if (d0 > 0) {
			return "M" + (w0 + 1) * cellSize + "," + (d0 - 1) * cellSize + "H"
					+ w0 * cellSize + "V" + 7 * cellSize + "H" + w1 * cellSize
					+ "V" + d1 * cellSize + "H" + (w1 + 1) * cellSize + "V" + 0
					+ "H" + (w0 + 1) * cellSize + "Z";
		}
	}

	d3.select(self.frameElement).style("height", "2910px");
}