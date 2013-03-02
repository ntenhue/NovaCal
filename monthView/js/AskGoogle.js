
function AskGoogle(calendarModel) {
	
	this.calendarsList = function() {
		this.request =  gapi.client.calendar.calendarList.list();	
		this.request.execute(function(resp) {
			console.log("received calendars list:", resp); 
			calendarModel.addCalendars(resp.items);
			});
		}
	
	this.calendarsEventsList = function(calendarId, pageToken) {
		this.request = gapi.client.calendar.events.list({
			'calendarId': calendarId, 
			'maxResults': 250,
			'singleEvents': true,
			'showDeleted': false,
			'orderBy': 'startTime',
			//'fields': 'items(colorId,start,end,summary,id),nextPageToken',
			'pageToken': pageToken
			});
		
		this.request.execute(function(resp){
			console.log("received events list:", resp); 
			
			if (resp.items != null) { calendarModel.addEvents(resp.items); }	
			if (resp.nextPageToken != null) { 
				// if there are more pages to show,
				// the function calls itself with a nextPageToken
				// recursion is stopped on the last page, 
				// since nextPageToken of it is NULL
				askGoogle.calendarsEventsList(calendarId,resp.nextPageToken);
				}
			});
		}
}


