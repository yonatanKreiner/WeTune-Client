'use strict';

/**
 * @ngdoc function
 * @name weTuneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weTuneApp
 */
angular.module('weTuneApp')
  .controller('MainCtrl', function ($scope, $sce, Database, RoomService) {
	var vm = this;
	vm.name = "tempor";
	vm.code = "1234";
	//vm.name = RoomService.name;
	//vm.pin = RoomService.pin;
	vm.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + "cxG-kOTMgaA");

var db = Database.ref("rooms/" + vm.name + "/songs").on("value", function(data){
	vm.songs = data.val();
	if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
		$scope.$apply();
	}
	console.log(vm.songs);
});



  });
