function View(parent, calendarModel) {

	this.listCalendarsButton = $("<button>");
	this.listCalendarsButton.html("Update calendars");
	this.listCalendarsForm = $("<form>");

	this.getEventsButton = $("<button>");
	this.getEventsButton.html("Load events");

	this.updateViewButton = $("<button>");
	this.updateViewButton.html("Show");

	this.colorEventsButton = $("<button>");
	this.colorEventsButton.html("E");
	
	this.colorCalsButton = $("<button>");
	this.colorCalsButton.html("C");
	
	
	this.colorMonthSpan = $("<span>");
	this.colorMonthSpan.html(appModel.colorMonth);

	
	this.workingSpan = $('<span style="color:#CCCCCC">');

	
	/*
	 * this.tableEvents = $("<table>"); this.tableEventsList = $("<tbody>");
	 * this.tableEvents.append(this.tableEventsList);
	 * 
	 * this.tableOccupancy = $("<table>"); this.tableOccupancyList = $("<tbody>");
	 * this.tableOccupancy.append(this.tableOccupancyList);
	 * 
	 */
	parent.append(/* this.listCalendarsButton, */this.listCalendarsForm,
	/* this.getEventsButton, */this.updateViewButton, " ", this.workingSpan);

	$("#settings").append( this.colorCalsButton, this.colorEventsButton, "Color bars: ", this.colorMonthSpan);
	$("#settings").hide();
	
	/***************************************************************************
	 * Observer implementation
	 **************************************************************************/

	// Register an observer to the model
	calendarModel.addObserver(this);
	appModel.addObserver(this);

	// This function gets called when there is a change at the model
	this.update = function(what, k) {

		if (what == "calendars") {
			this.listCalendarsForm.empty();

			var calendars = calendarModel.getCalendars();
			
			this.listItem = [];
			//this.listLabel = [];
			this.statusLabel = [];
			for ( var i in calendars) {
				this.listItem[i] = $('<input type="checkbox" name="radioCalendars">');
				// this.listItem[i].attr("value",i);
				// this.listItem[i].attr("checked",false);
				// this.listItem[i].attr("id", "radioCalendar" + i);
				var listLabel = $('<label>');
				listLabel.attr("for", "radioCalendar" + i);
				listLabel.html(calendars[i].summary);
				
				this.statusLabel[i] = $('<span style="color:#CCCCCC">');
				this.statusLabel[i].html(appModel.getCldrStatus(i));
				
				this.listCalendarsForm.append(this.listItem[i], listLabel, " ", this.statusLabel[i], "<br>");
			}
		}

		
		if (what == "yearview") {
			var see = 0;
			var k;
			for ( var i in view.listItem) {	if (this.listItem[i].prop('checked')) {	see++; k = i;	}	}

			if (see != 0) {	
				if (see > 1) k=null;
				
			appModel.setWorkingStatus("updating year view...");
			yearView(k, this.listItem, function(){appModel.setWorkingStatus("");});	
			}
		}
		
		if (what == "cldrStatus") {
			for (var i in this.statusLabel) this.statusLabel[i].html(appModel.getCldrStatus(i));
		}
		
		if (what == "workingStatus") {
			this.workingSpan.html(appModel.getWorkingStatus());
		}
		
		if (what == "monthview") {
			var see = 0;
			var k;
			for ( var i in view.listItem) {	if (view.listItem[i].prop('checked')) {	see++; k = i;	}	}

			if (see != 0 && appModel.selectedMonth!=null) {	
				if (see > 1) k=null;
				appModel.setWorkingStatus("updating month view...");
				monthView = new MonthView (k, view.listItem,appModel.selectedYear,
											  appModel.selectedMonth, 
											  function(){appModel.setWorkingStatus("");	});
				}else{ 
				$("#monthViewCanvas").empty();
				}
			
			this.colorMonthSpan.html(appModel.colorMonth);
		}
		
		if (what == "events loaded") {
			
			appModel.setWorkingStatus("calculating occupancy...");
			calendarModel.totalBusyHours = calendarModel.updateTotalBusyHours(calendarModel.calendars,	view.listItem);
			
			
			view.update("yearview");
			view.update("monthview");
		
			//if (this.listLabel[k].hasOwnProperty("loading"))this.listLabel[k].loading.remove();
			
			
				
			
			// calendarModel.totalBusyHours=calendarModel.updateTotalBusyHours(calendarModel.calendars,this.listItem);
			// yearView(); legendView();

			/*
			 * 
			 * this.tableEventsList.empty();
			 * 
			 * var events = calendarModel.getEvents(); for (var i in events){
			 * var tableRow = $("<tr>"); tableRow.html( " <td> start date: " +
			 * events[i].start.date+ " </td> "+ " <td> start time: " +
			 * events[i].start.time+ " </td> "+
			 *  " <td> ----- end date: "+ events[i].end.date+" </td> "+ " <td>
			 * end time: "+ events[i].end.time+" </td> "+
			 *  " <td> ----- duration: "+ events[i].duration +" </td> "+ " <td>
			 * ----- color: "+ events[i].colorId+" </td> "+ " <td> -----
			 * summary: "+ events[i].summary+" </td> ");
			 * 
			 * this.tableEventsList.append(tableRow);
			 * 
			 *  }
			 * 
			 * this.tableOccupancyList.empty(); var occupancy =
			 * calendarModel.getOccupancy(); for (var i in occupancy){ var
			 * tableRow = $("<tr>"); tableRow.html( " <td> date: " +
			 * occupancy[i].date+ " </td> "+ " <td> ----- hoursBusy: "+
			 * occupancy[i].hoursBusy+" </td> " + " <td> ----- hoursByColor: "+
			 * occupancy[i].hoursByColor+" </td> " );
			 * 
			 * this.tableOccupancyList.append(tableRow);
			 * 
			 *  }
			 */

		}
	}

}

function ViewController(view, calendarModel) {

	view.colorCalsButton.click(function() {	appModel.colorMonth="byCalendars";	view.update("monthview"); });
	view.colorEventsButton.click(function() { appModel.colorMonth="byEvents"; 	view.update("monthview"); });

	view.updateViewButton.click(function() {
		var see = 0;
		var k;

		for ( var i in view.listItem) {if (view.listItem[i].prop('checked')) {	
			askGoogle.checkUpdatesAndLoad(i);
			see++;
			}}
		
		setTimeout(function() {
		for ( var i in view.listItem) {
			if (view.listItem[i].prop('checked') 
			&&!(appModel.getCldrStatus() == "updated" 
			  ||appModel.getCldrStatus() == "loaded")) {	see=0;
			}}	
		}, 500);

		
		if (see != 0) {	
			appModel.setWorkingStatus("calculating occupancy...");
			calendarModel.totalBusyHours = calendarModel.updateTotalBusyHours(calendarModel.calendars,	view.listItem);
			
			view.update("yearview");
			view.update("monthview");
			}

		});
	
	}
	