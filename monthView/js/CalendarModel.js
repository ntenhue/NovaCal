
	/*****************************************  
	    CalendarModel    
	*****************************************/

function CalendarModel(){
	this.calendars= new Array();
	this.events= new Array();
	this.occupancy =new Array();  // [{"date":"2012-02-16","hoursBusy":5},{"date":"2012-02-17","hoursBusy":8},{"date":"2012-02-18","hoursBusy":2}];
	


	
	

	
this.addCalendars = function (items) {	
	this.calendars = items;
	this.notifyObservers("calendars");	}

this.clearCalendars = function () {	
	this.evecalendarsnts=0;
	this.notifyObservers("calendars");	
	}	

this.addEvents = function (items) {	
	this.events=this.events.concat(items);
	this.updateEventsDuration();
	this.updateEventColor();
	this.occupancy = this.updateOccupancy(this.events);
	this.notifyObservers("events");	
	}	

this.clearEvents = function () {	
	this.events=[];
	this.occupancy=[];
	this.notifyObservers("events");	
	}	

this.getCalendars = function () {
	return this.calendars;	}
this.getEvents = function () {	
	return this.events;	}	


this.getOccupancy = function () {
	return this.occupancy;	}



this.findCalendarBySummary = function (summary){
	for (var i in this.calendars){
		if (this.calendars[i].summary==summary){
			return	this.calendars[i].id;
			}
		}
	}
	
	

this.getEventsInRange = function(fromAsked,tillAsked){
	// this function receives a range of dates in format "yyyy-mm-dd"
	// and returns an array of events which fall between the specified frames
	// valid requests formats: 
	// 1 to 15 march inclusive: ("2013-03-01","2013-03-15") 
	// all march: ("2013-03-01","2013-03-99")
	// all march: ("2013-03","2013-03")
	// all march: ("2013-03")
	// all 2013:  ("2013")
	
	if (tillAsked == null) tillAsked=fromAsked;
	var result=[];
	
	var from = {"y":0,"m":0,"d":0}
	var till = {"y":9999,"m":99,"d":99}
	
	
	if (fromAsked.length>=4) from.y = fromAsked.substring(0,4);
	if (fromAsked.length>=7) from.m = fromAsked.substring(5,7);
	if (fromAsked.length>=9) from.d = fromAsked.substring(8,10);
							 from.date = new Date(from.y,from.m-1,from.d);
	
	if (tillAsked.length>=4) till.y = tillAsked.substring(0,4);
	if (tillAsked.length>=7) till.m = tillAsked.substring(5,7);
	if (tillAsked.length>=9) till.d = tillAsked.substring(8,10);
							 till.date = new Date(till.y,till.m-1,till.d);
		
	for (var i in this.events){
		var eventDateStart = new Date (this.events[i].start.date.substring(0,4),
									   this.events[i].start.date.substring(5,7)-1,
									   this.events[i].start.date.substring(8,10));
		if(eventDateStart>=from.date && eventDateStart<=till.date) result.push (this.events[i]);
		}
	
	return result;
	}




	
	
this.updateEventsDuration = function () {

	// parse a date based on a dateDay field (e.g. 2011-09-03) and a dateTime field (e.g. 09:30)
	var parseDate = function (dateDay, dateTime) {
		var dateDay = dateDay.split('-');
		var dateTime = dateTime.split(':');
		var fullDate = dateDay.concat(dateTime).map( function( num ) { return parseInt( num, 10 ) } );
	 
		return new Date(fullDate.shift(), fullDate.shift(), fullDate.shift(), fullDate.shift(), fullDate.shift());
		};
	 
	// calculate the difference between two dates in hours
	var dateDiff = function (startDate, endDate){
		var diff = endDate - startDate;
		return diff / ( 1000 * 60 *60 );
		};


		
	for (var i in this.events){
		if (this.events[i].start.hasOwnProperty("dateTime")){
			this.events[i].start.date = this.events[i].start.dateTime.substring(0,10);
			this.events[i].start.time = this.events[i].start.dateTime.substring(11,16);
			this.events[i].end.date = this.events[i].end.dateTime.substring(0,10);
			this.events[i].end.time = this.events[i].end.dateTime.substring(11,16);
			
			this.events[i].duration=dateDiff(parseDate(this.events[i].start.date,this.events[i].start.time), 
									 		 parseDate(this.events[i].end.date,this.events[i].end.time));
		} else {
			this.events[i].duration=dateDiff(parseDate(this.events[i].start.date,"00:00"), 
			 		 						 parseDate(this.events[i].end.date,"00:00")); 
		}
	}
}
	
	
this.updateEventColor = function () {
	for (var i in this.events){	if (this.events[i].colorId == null) this.events[i].colorId = 0; }
}





this.updateOccupancy = function (events) {
	
	var occupancy = [];
	var pushNeeded=true;
	
	for (var i in events){	if (events[i].duration<24){
		
		for (var j in occupancy){
			if (events[i].start.date == occupancy[j].date) {
				
				occupancy[j].hoursBusy += events[i].duration;
				occupancy[j].hoursByColor[events[i].colorId] += events[i].duration;
				
				pushNeeded = false;
				break;
				
				} else {

				if (j==occupancy.length-1)	pushNeeded = true;

				}
			}
		
		if (pushNeeded) {
			occupancy.push({'date':' ', 'hoursBusy':0, 'hoursByColor':[0,0,0,0,0,0,0,0,0,0,0,0] });
			
			occupancy[occupancy.length-1].date = events[i].start.date;
			occupancy[occupancy.length-1].hoursBusy = events[i].duration;
			occupancy[occupancy.length-1].hoursByColor[events[i].colorId] = events[i].duration;
			
			}
		
	}}
	
	
	return occupancy;
	
}
	
/*****************************************  
    Observable implementation    
*****************************************/

this._observers = [];

this.addObserver = function(observer) 
{
	this._observers.push(observer);
}

this.notifyObservers = function(arg) 
{
	for(var i=0; i<this._observers.length; i++) 
	{
		this._observers[i].update(arg);
	}	
}
	
}
