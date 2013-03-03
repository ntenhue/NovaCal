/**
 * @author Angie Skazka
 */


function AppGeneralController(appModel) {
    
    authentification = new Authentification(appModel);
    
    //Register an observer to the model
    appModel.addObserver(this);

    //This function gets called when there is a change at the model
    this.update = function(arg) {
    //setTimeout(function() {}, 2000);
        if (arg == 'libraryStatus' && appModel.getLibraryStatus()) {
            calendarModel = new CalendarModel();
            askGoogle = new AskGoogle(calendarModel);
            view = new View($("#workspace"), calendarModel);
            viewController = new ViewController(view, calendarModel);
            
            view.listCalendarsButton.click();
            
            yearView(null, view.listItem); legendView();
            
            
            }

        }
    }