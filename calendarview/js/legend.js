function legendView(){
	$("#mylegend").empty();
    //Width and height
    var w = 100;
    var h = 290;
    var padding = 50;
 
    var dataset = [
        ["q0-11"],
        ["q1-11" ],
        ["q2-11"],
        ["q3-11"],
        ["q4-11"],
        ["q5-11"],
        ["q6-11"],
        ["q7-11"],
        ["q8-11"],
        ["q9-11"],
        ["q10-11"],
        /*["q11-11"],
        ["q12-11"],*/
    ];

    var color_hash = {  0 : ["0-2 h", "rgb(255,255,255)"],
		    			1 : ["2-4 h", "rgb(255,255,204)"],
		    			2 : ["4-6 h", "rgb(255,237,160)"],
		    			3 : ["6-8 h", "rgb(254,217,118)"],
		    			4 : ["8-10 h", "rgb(254,178,76)"],
		    			5 : ["10-12 h", "rgb(253,141,60)"],
		    			6 : ["12-14 h", "rgb(252,78,42)"],
		    			7 : ["14-16 h", "rgb(227,26,28)"],
		    			8 : ["16-18 h", "rgb(177,0,38)"],
		    			9 : ["18-20 h", "rgb(137,0,27)"],
		    			10: ["20+ h",   "rgb(73,0,12)"],
		    			/*11: ["q11-11", "rgb(35,0,6)"],
		    			12: ["q12-11", "rgb(16,0,4)"]*/
		  }                     
    
	// Create SVG element
	var svg = d3.select("#mylegend") //body replaced by #mylegend
	    .append("svg")
	    .attr("width", w)
	    .attr("height", h);
/*
	// Add title	  
	svg.append("svg:text")
		   .attr("class", "title")
	   .attr("x", 20)
	   .attr("y", 20)
	   .text("Yearly Overview of Your Google Calendar(s)");
*/

	// add legend   
	var legend = svg.append("g")
	  .attr("class", "legend")
	  .attr("x", w - 65)
	  .attr("y", 25)
	  .attr("height", 100)
	  .attr("width", 100);
	  
	legend.selectAll('g').data(dataset)
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);
        g.append("rect")
          .attr("x", w - 65)
          .attr("y", i*25 +10)
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", color_hash[String(i)][1])
          .style("stroke", "grey");
        
        g.append("text")
          .attr("x", w - 50)
          .attr("y", i * 25 + 18)
          .attr("height",30)
          .attr("width",100)
          .style("fill", "grey")
          .text(color_hash[String(i)][0]);


      });
}

