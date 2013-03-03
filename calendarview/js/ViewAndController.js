function View(parent, calendarModel) {
	
	this.listCalendarsButton = $("<button>");
	this.listCalendarsButton.html("Update calendars");
	this.listCalendarsForm = $("<form>");
	
	
	this.getEventsButton = $("<button>");
	this.getEventsButton.html("Load events");	

	this.updateViewButton = $("<button>");
	this.updateViewButton.html("Update");
	



	/*
	this.tableEvents = $("<table>");
	this.tableEventsList = $("<tbody>");
	this.tableEvents.append(this.tableEventsList);
	
	this.tableOccupancy = $("<table>");
	this.tableOccupancyList = $("<tbody>");
	this.tableOccupancy.append(this.tableOccupancyList);
	
	*/
	parent.append(/*this.listCalendarsButton,*/ this.listCalendarsForm, 
				  /*this.getEventsButton,*/ this.updateViewButton);
	
	

	/*****************************************  
	      Observer implementation    
	*****************************************/
	
	//Register an observer to the model
	calendarModel.addObserver(this);
	
	//This function gets called when there is a change at the model
	this.update = function(arg){
		
		if (arg == "calendars") {
			this.listCalendarsForm.empty();
			
			var calendars = calendarModel.getCalendars();
			this.listItem = [];
			for (var i in calendars){
				this.listItem[i]= $('<input type="checkbox" name="radioCalendars">');
				//this.listItem[i].attr("value",i);
				//this.listItem[i].attr("checked",false);
				this.listItem[i].attr("id","radioCalendar"+i);
				var listLabel = $('<label>');
				listLabel.attr("for","radioCalendar"+i);
				listLabel.html(calendars[i].summary+'<br>');
				this.listCalendarsForm.append(this.listItem[i],listLabel);
				}
			}	
		
		if (arg == "events") {
		
		calendarModel.totalBusyHours=calendarModel.updateTotalBusyHours(calendarModel.calendars,this.listItem);
			yearView();  legendView();
		
		/*
		
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
			
			
			}*/
		
		
		}
	}
		
	
}


function ViewController(view, calendarModel) {

	
	view.listCalendarsButton.click(function () { 
		askGoogle.loadCalendars();
		});
	
	/*view.getEventsButton.click(function () { 
		//var k = $('input[name=radioCalendars]:checked').val();
		//if (k!=null)askGoogle.checkUpdatesAndLoad(k);
		
		for (var k in view.listItem) {
			if (view.listItem[k].prop('checked'))askGoogle.checkUpdatesAndLoad(k);
			}
		
		
		});*/

	view.updateViewButton.click(function () {
		
		for (var k in view.listItem) {
			if (view.listItem[k].prop('checked'))askGoogle.checkUpdatesAndLoad(k);
			}
		
		calendarModel.totalBusyHours=calendarModel.updateTotalBusyHours(calendarModel.calendars,view.listItem);
		yearView();  legendView();
		
	});

}
