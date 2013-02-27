
	/*****************************************  
	    CalendarModel    
	*****************************************/

function CalendarModel(){
	this.calendars= new Array();
	this.events= new Array();
	this.occupancy = [{"date":"2012-02-16","hoursBusy":5},{"date":"2012-02-17","hoursBusy":8},{"date":"2012-02-18","hoursBusy":2}];
	


	
	

	
	this.setCalendars = function (items) {	
		this.calendars = items;
		this.notifyObservers("calendars");	}
	this.setEvents = function (items) {	
		this.events = items;
		
		this.getEventsDuration();
		this.getDurationsPerDay();
		
		this.notifyObservers("events");	}	
	
	
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
	
	

	
	
this.getEventsDuration = function () {

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
	
	
	this.getDurationsPerDay = function () {
		this.occupancy = [];
		var pushNeeded=true;
		
		for (var i in this.events){	if (this.events[i].duration<24){
			
			for (var j in this.occupancy){
				if (this.events[i].start.date == this.occupancy[j].date) {
					
					this.occupancy[j].hoursBusy += this.events[i].duration;
					pushNeeded = false;
					break;
					
					} else {

					if (j==this.occupancy.length-1)	pushNeeded = true;

					}
				}
			
			if (pushNeeded) {
				this.occupancy.push({'date':this.events[i].start.date,'hoursBusy':this.events[i].duration});
				}
			
		}}
		
		
		
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
