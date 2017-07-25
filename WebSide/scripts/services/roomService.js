var mainApp = angular.module("weTuneApp");

mainApp.service('RoomService', function(){
	this.login = function(name, pin) {
		this.name = name;
  	this.pin = pin;
	}
});
