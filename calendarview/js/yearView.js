function yearView(){

	
	$("#mycanvas").empty();

	var width = 960,
	    height = 136,
	    cellSize = 17; // cell size
	
	var day = d3.time.format("%w"),     //%w weekday as a decimal number [0(Sunday),6].
	    week = d3.time.format("%U"),	//%U week number of the year (Sunday as the first day of the week) as a decimal number [00,53].
	    percent = d3.format(".1%"),		//
	    format = d3.time.format("%Y-%m-%d");
	    
	    
	/*------------------------*/
	/* importing the data   */
	/*----------------------*/
	//d3-array:https://github.com/mbostock/d3/wiki/Arrays
		
	d3.csv("dataset/sample_data_v0.1.csv", function(error, csv) {
		//console.log(csv);
		csv=calendarModel.occupancy;	
		//console.log(csv);
		
		//Getting the associative array from datasource
	  var data = d3.nest()		//Nesting allows elements in an array to be grouped into a hierarchical tree structure;
	    .key(function(d) {   return d.date;  })		//The levels in the tree are specified by key functions
	    .rollup(function(d) { return d[0].hoursBusy;   })		//An optional rollup function will collapse the elements in each leaf node using a summary function
	    .map(csv);		//The return value of the rollup function will replace the array of leaf values in either the associative array returned by the map operator, or
	    	//Applies the nest operator to the specified array, returning an associative array. 
	    
	    //selector,filter:https://github.com/mbostock/d3/wiki/Selections#wiki-filter
	  rect.filter(function(d) { return d in data; })		//Filters the selection, returning a new selection that contains only the elements for which the specified selector is true.
	      .attr("class", function(d) { return "day " + color(data[d]); })	//set the class of the grid to a particular color class according to the value
	    .select("title")
	      .text(function(d) { return d + " you are busy: " + data[d] +" hours"; });
	     
	     
	});
	
	

	var color = d3.scale.quantize()		//quantize() ,output discrete range, the mapping is linear
	    //.domain([-.05, .05])
		.domain([24.0, 0.0])	//input domain
	    .range(d3.range(11).map(function(d) { return "q" + d + "-11"; }));  //output range

	
	
	var svg = d3.select("#mycanvas").selectAll("svg")
    //.data(d3.range(1990, 2011))
	 .data(d3.range(2011, 2014))
  .enter().append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "RdYlGn")
  .append("g")		//Used to group together elements, so this is tha actual grids we see
    .attr("transform", "translate(" + ((width - cellSize * 53)/2) + "," + (height - cellSize * 7 - 1) + ")");  
    //translate(x,y),is for moving a graph object;
    //this is actually the margins of the whole graph, (29.5,16)

svg.append("text")
    .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
    .style("text-anchor", "middle")
    .text(function(d) { return d; });

	
	
	var rect = svg.selectAll(".day")
    .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    	//d3.time.days(start, stop[, step])
    	//Date(year, month, day)
    	//it gets every day from the year d to year d+1
  .enter().append("rect")     //Here they draw the grids.
    .attr("class", "day")
    .attr("width", cellSize)
    .attr("height", cellSize)
    .attr("x", function(d) { return week(d) * cellSize; })   //position of each grid
    .attr("y", function(d) { return day(d) * cellSize; })
    .datum(format); //get the value from format,d3.time.format("%Y-%m-%d")

rect.append("title")
    .text(function(d) { return d; });

svg.selectAll(".month")
    .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    	//d3.time.months(start, stop[, step]).
    	//every month from year d to year d+1
  .enter().append("path")
    .attr("class", "month")
    .attr("d", monthPath);		//set the border of a month on the graph, using the function monthPath




function monthPath(t0) {
	  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
	      d0 = +day(t0), w0 = +week(t0),
	      d1 = +day(t1), w1 = +week(t1);
	  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
	      + "H" + w0 * cellSize + "V" + 7 * cellSize
	      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
	      + "H" + (w1 + 1) * cellSize + "V" + 0
	      + "H" + (w0 + 1) * cellSize + "Z";
	}
	




d3.select(self.frameElement).style("height", "2910px");


}
