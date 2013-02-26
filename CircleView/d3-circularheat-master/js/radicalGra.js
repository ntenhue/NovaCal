
/*Label Data*/
var year = 2012;
var month = 1;
var monthlyDays = [];
var monthDays = 30;
if(month == 1||3||5||7||8||10||12){
	for(i=1;i<32;i++){
		monthlyDays.push(i);
	}
	monthDays = 31;
}
else if(month == 4||6||9||11){
	for(i=1;I<31;i++){
		monthlyDays.push(i);
	}
	monthDays = 30;
}

var eventData = [];
/*for(var i=0; i<3; i++) {
	eventData[i] = [];
	for(var j=0; j<120; j++) {
	    eventData[i][j] = Math.random();
	}
}*/

eventData = [
	[
	1,2,3,4,5,6,7,
	1,2,3,4,5,6,7,
	1,2,3,4,5,6,7,
	1,2,3,4,5,6,7,
	1,2
	],
	[
	7,6,5,4,3,2,1,
	7,6,5,4,3,2,1,
	7,6,5,4,3,2,1,
	7,6,5,4,3,2,1,
	7,6,5
	],
	[
	5,4,3,2,1,7,6,
	5,4,3,2,1,7,6,
	5,4,3,2,1,7,6,
	5,4,3,2,1,7,6,
	]
];


var chart = circularHeatChart()
    .segmentHeight(40)
    .innerRadius(40)
    .numSegments(30)
    //.segmentLabels(days)
    //.radialLabels(weeks)
    .range(['white','#3333EE'])
    .margin({top: 180, right: 0, bottom: 30, left: 80});
    
    d3.select('#energychart')
        .selectAll('svg')
        .data(eventData)
        .enter()
        .append('svg')
        .call(chart);

var d = new Date('2013-02-28T11:00:00+01:00'); 
var d2 = new Date('2013-02-28T12:00:00+01:00');
var getDuration = function(t){     //in hours
	return t/360000;
}
console.log(Date.parse(d2)-Date.parse(d));
