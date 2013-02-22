var chart = circularHeatChart()
    .segmentHeight(20)
    .innerRadius(20)
    .numSegments(7)
    .segmentLabels(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    .radialLabels(["W_1","W_2", "W_3","W_4","W_5"])
    .margin({top: 20, right: 0, bottom: 20, left: 280});
    /*.segmentHeight(20)
    .innerRadius(20)
    .numSegments(24)
    .radialLabels(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    .segmentLabels(["Midnight", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "Midday", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"])
    .margin({top: 20, right: 0, bottom: 20, left: 280});*/
var energyData = [
    2
,2
,2
,0
,4
,2
,2
,5
,2
,2
,2
,2
,7
,2
,2
,2
,2
,3
,2
,2
,6
,2
,2
,11
,2
,2
,3
,2
,2
,2
,2
,2
,2
,4
,24
   ];

d3.select('#energychart')
    .selectAll('svg')
    .data([energyData])
    .enter()
    .append('svg')
    .call(chart);

/* Simple chart */
chart.segmentHeight(10)
    .innerRadius(20)
    .numSegments(24)
    .radialLabels(null)
    .segmentLabels(null)
    .margin({top: 20, right: 20, bottom: 20, left: 20});
var data = [];
for(var i=0; i<240; i++) {
    data[i] = i;
}

d3.select('#chart1')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .call(chart);

/* An array of charts */
data = [];
for(var i=0; i<3; i++) {
	data[i] = [];
	for(var j=0; j<120; j++) {
	    data[i][j] = Math.random();
	}
}

chart.range(["white", "black"]).margin({top: 20, right: 20, bottom: 20, left: 20});
d3.select('#chart2')
    .selectAll('svg')
    .data(data)
    .enter()
    .append('svg')
    .style('width', '200px')
    .style('height', '200px')
    .call(chart);

/* Labels */
chart.innerRadius(20)
    .segmentHeight(20)
    .range(["white", "steelblue"])
    .radialLabels(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"])
    .segmentLabels(["Midnight", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "Midday", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"]);
var data = [];
for(var i=0; i<168; i++) {
    data[i] = Math.random();
}
d3.select('#chart3')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .call(chart);


/* An array of objects */
data = [];
for(var i=0; i<240; i++) {
    data[i] = {title: "Segment "+i, value: Math.round(Math.random()*100)};
}

chart.accessor(function(d) {return d.value;})
    .radialLabels(null)
    .segmentLabels(null);
d3.select('#chart4')
    .selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .call(chart);

/* Add a mouseover event */
d3.selectAll("#chart4 path").on('mouseover', function() {
	var d = d3.select(this).data()[0];
    d3.select("#info").text(d.title + ' has value ' + d.value);
});
d3.selectAll("#chart4 svg").on('mouseout', function() {
    d3.select("#info").text('');	
});

/* Add a mouseover event */
d3.selectAll("#energychart path").on('mouseover', function() {
	var d = d3.select(this).data()[0];
    d3.select("#infoEnergy").text(' has value ' + d);
});
d3.selectAll("#energychart svg").on('mouseout', function() {
    d3.select("#infoEnergy").text('');	
});

