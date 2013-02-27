/**
 * @author Angie Skazka
 */


	/*****************************************  
	    AppModel    
	*****************************************/

function AppModel(){
	this.loginStatus = false;
	this.libraryStatus = false;
	
	this.setLoginStatus = function (value) {	
		this.loginStatus=value;
		this.notifyObservers("loginStatus");	}	
	this.setLibraryStatus = function (value) {	
		this.libraryStatus=value;
		this.notifyObservers("libraryStatus");	}
	
	this.getLoginStatus = function () {	
		return this.loginStatus;}
	this.getLibraryStatus = function () {	
		return this.libraryStatus;}	
	
	
	
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
