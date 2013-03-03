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
	
	
	/*
	 * this.tableEvents = $("<table>"); this.tableEventsList = $("<tbody>");
	 * this.tableEvents.append(this.tableEventsList);
	 * 
	 * this.tableOccupancy = $("<table>"); this.tableOccupancyList = $("<tbody>");
	 * this.tableOccupancy.append(this.tableOccupancyList);
	 * 
	 */
	parent.append(/* this.listCalendarsButton, */this.listCalendarsForm,
	/* this.getEventsButton, */this.updateViewButton);

	$("#settings").append( this.colorCalsButton, this.colorEventsButton, "Color month by ", this.colorMonthSpan);
	
	/***************************************************************************
	 * Observer implementation
	 **************************************************************************/

	// Register an observer to the model
	calendarModel.addObserver(this);

	// This function gets called when there is a change at the model
	this.update = function(arg) {

		if (arg == "calendars") {
			this.listCalendarsForm.empty();

			var calendars = calendarModel.getCalendars();
			this.listItem = [];
			for ( var i in calendars) {
				this.listItem[i] = $('<input type="checkbox" name="radioCalendars">');
				// this.listItem[i].attr("value",i);
				// this.listItem[i].attr("checked",false);
				this.listItem[i].attr("id", "radioCalendar" + i);
				var listLabel = $('<label>');
				listLabel.attr("for", "radioCalendar" + i);
				listLabel.html(calendars[i].summary + '<br>');
				this.listCalendarsForm.append(this.listItem[i], listLabel);
			}
		}

		if (arg == "events") {

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

	view.listCalendarsButton.click(function() {
		askGoogle.loadCalendars();
	});

	/*
	 * view.getEventsButton.click(function () { //var k =
	 * $('input[name=radioCalendars]:checked').val(); //if
	 * (k!=null)askGoogle.checkUpdatesAndLoad(k);
	 * 
	 * for (var k in view.listItem) { if
	 * (view.listItem[k].prop('checked'))askGoogle.checkUpdatesAndLoad(k); }
	 * 
	 * 
	 * });
	 */
	
	view.colorCalsButton.click(function() {	
		appModel.colorMonth="byCalendars";
		view.colorMonthSpan.html(appModel.colorMonth);	});
	
	view.colorEventsButton.click(function() {appModel.colorMonth="byEvents";
		view.colorMonthSpan.html(appModel.colorMonth);	});

	view.updateViewButton.click(function() {
		var see = 0;
		var k;

		for ( var i in view.listItem) {
			if (view.listItem[i].prop('checked')) {	askGoogle.checkUpdatesAndLoad(i);
				see++;k = i;	}	}

		if (see != 0) {	setTimeout(function() {

				calendarModel.totalBusyHours = calendarModel.updateTotalBusyHours(calendarModel.calendars,	view.listItem);

				if (see == 1) {
					yearView(k, view.listItem);	legendView();
				} else {
					yearView(null, view.listItem);	legendView();
				}

			}, 1000);}

	});

}
