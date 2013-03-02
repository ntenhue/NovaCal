function View(parent, calendarModel) {
	
	this.listCalendarsButton = $("<button>");
	this.listCalendarsButton.html("Update calendars");
	this.listCalendarsList = $("<ul>");

	this.inputForm = $("<form>");
	this.inputForm.html("Choose one and paste here the name");
	
	this.chosenIdTextField = $("<input>");
	this.chosenIdTextField.attr = {
			type: "text",
			name: "Choose one and paste here the name", 
			value: ""
				};
	this.inputForm.append(this.chosenIdTextField);  
	
	this.getEventsButton = $("<button>");
	this.getEventsButton.html("Get events");	
	
	this.tableEvents = $("<table>");
	this.tableEventsList = $("<tbody>");
	this.tableEvents.append(this.tableEventsList);
	
	this.tableOccupancy = $("<table>");
	this.tableOccupancyList = $("<tbody>");
	this.tableOccupancy.append(this.tableOccupancyList);
	
	parent.append(this.listCalendarsButton, this.listCalendarsList, this.inputForm,
			this.getEventsButton, this.resultDiv, this.tableEvents,   this.tableOccupancy);
	
	

	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	calendarModel.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		
		if (arg = "calendars") {
			this.listCalendarsList.empty();
			
		var calendars = calendarModel.getCalendars();
		for (var i in calendars){
			var listItem = $("<li>");
			listItem.html("<li>"+calendars[i].summary+"</li>");
			this.listCalendarsList.append(listItem);
			}	
		this.chosenIdTextField.attr= {value: calendars[calendars.length-1].summary};
		}	
		/*
		if (arg = "events") {
		this.tableEventsList.empty();
		
		var events = calendarModel.getEvents();
		for (var i in events){
			var tableRow = $("<tr>");
			tableRow.html(
					" <td> start date: " + events[i].start.date+ " </td>  "+
					" <td> start time: " + events[i].start.time+ " </td>  "+
					
					" <td> ----- end date: "+ events[i].end.date+" </td>  "+
					" <td> end time: "+ events[i].end.time+" </td>  "+
					
					" <td> ----- duration: "+ events[i].duration +" </td>  "+
					" <td> ----- color: "+ events[i].colorId+" </td> "+			
					" <td> ----- summary: "+ events[i].summary+" </td> ");
				
			this.tableEventsList.append(tableRow);	
			
			
			}	
		
		this.tableOccupancyList.empty();
		var occupancy = calendarModel.getOccupancy();
		for (var i in occupancy){
			var tableRow = $("<tr>");
			tableRow.html(
					" <td> date: " + occupancy[i].date+ " </td>  "+		
					" <td> ----- hoursBusy: "+ occupancy[i].hoursBusy+" </td> " + 
					" <td> ----- hoursByColor: "+ occupancy[i].hoursByColor+" </td> " );
				
			this.tableOccupancyList.append(tableRow);	
			
			
			}
		
		
		}*/
	}
		
	
}


function ViewController(view, calendarModel) {

	
	view.listCalendarsButton.click(function () { 
		askGoogle.calendarsList();});
	
	view.getEventsButton.click(function () { 
		calendarModel.clearEvents();
		askGoogle.calendarsEventsList(
				calendarModel.findCalendarBySummary(
						view.chosenIdTextField.val()),null);});


}
