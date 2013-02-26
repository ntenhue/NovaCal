
function AskGoogle(calendarModel) {
	
	this.calendarsList = function() {
		this.request =  gapi.client.calendar.calendarList.list();	
		this.request.execute(function(resp) {
			console.log("received calendars list:", resp); 
			calendarModel.setCalendars(resp.items);
			});
		}
	
	this.calendarsEventsList = function(calendarId) {
		this.request = gapi.client.calendar.events.list({
			'calendarId': calendarId, 
			'maxResults': 250,
			'singleEvents': true,
			'showDeleted': false
		});
		this.request.execute(function(resp){
			console.log("received events list:", resp); 
			calendarModel.setEvents(resp.items);
		 	});
		}
}

