function View(parent, calendarModel) {
	
	this.listCalendarsButton = $("<button>");
	this.listCalendarsButton.html("Update calendars");
	this.listCalendarsForm = $("<form>");
	
	
	this.getEventsButton = $("<button>");
	this.getEventsButton.html("Load events");	
	
	/*
	this.tableEvents = $("<table>");
	this.tableEventsList = $("<tbody>");
	this.tableEvents.append(this.tableEventsList);
	
	this.tableOccupancy = $("<table>");
	this.tableOccupancyList = $("<tbody>");
	this.tableOccupancy.append(this.tableOccupancyList);
	
	*/
	parent.append(this.listCalendarsButton, this.listCalendarsForm, this.getEventsButton);
	
	

	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	calendarModel.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		
		if (arg = "calendars") {
			this.listCalendarsForm.empty();
			
		var calendars = calendarModel.getCalendars();
		for (var i in calendars){
			var listItem= $('<input type="radio" name="radioCalendars">');
			listItem.attr("value",i);
			listItem.attr("id","radioCalendar"+i);
			var listLabel = $('<label>');
			listLabel.attr("for","radioCalendar"+i);
			listLabel.html(calendars[i].summary+'<br>');
			this.listCalendarsForm.append(listItem,listLabel);
			}	
		//this.chosenIdTextField.attr= {value: calendars[calendars.length-1].summary};
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
		askGoogle.loadCalendars();});
	
	view.getEventsButton.click(function () { 
		var k = $('input[name=radioCalendars]:checked').val();
		calendarModel.clearEvents(k);
		askGoogle.loadEvents(k,null);
		});


}
