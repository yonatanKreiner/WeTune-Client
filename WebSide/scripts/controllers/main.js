'use strict';

/**
 * @ngdoc function
 * @name weTuneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weTuneApp
 */
angular.module('weTuneApp')
  .controller('MainCtrl', function ($scope, $sce, $location, Database, RoomService) {
	var vm = this;
	// if (!RoomService.name || !RoomService.pin) {
	// 	$location.path('/');
	// 	if(!$scope.$$phase) $scope.$apply();
	// }
	//vm.name = "pulse";
	//vm.pin = "1234";
	vm.name = RoomService.name;
	vm.pin = RoomService.pin;
	vm.src = "XIMLoLxmTDw";

	
Database.ref("rooms/" + vm.name + "/volume").on("value", function(data){
	console.log(1);
	if(vm.player){
		vm.player.setVolume(data.val());
	}
});

Database.ref("rooms/" + vm.name + "/status").on("value", function(data){
	console.log(2)
	if(data.val() && vm.player)
		{
			vm.player.playVideo();
		}else if(vm.player){
			vm.player.pauseVideo();
		}
});

$scope.$on('youtube.player.ready', function ($event, player) {
	console.log(3)
		vm.player = player;

		Database.ref("rooms/" + vm.name + "/songs").on("value", function(data){
			console.log(4)
			vm.songs = data.val();
			vm.src = vm.songs[Object.keys(vm.songs)[0]].url;
			player.playVideo();
		if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
			$scope.$apply();
		}
		console.log(vm.songs);
	});
  })

  $scope.$on('youtube.player.ended', function ($event, player) {
		console.log(Object.keys(vm.songs)[0]);
		Database.ref("rooms/" + vm.name + "/songs").child(Object.keys(vm.songs)[0]).remove();
		vm.src = vm.songs[Object.keys(vm.songs)[0]].url;
			player.playVideo();
	});
		
	  $scope.$on('youtube.player.error', function ($event, player) {
		console.log(Object.keys(vm.songs)[0]);
		Database.ref("rooms/" + vm.name + "/songs").child(Object.keys(vm.songs)[0]).remove();
		vm.src = vm.songs[Object.keys(vm.songs)[0]].url;
			player.playVideo();
  });

	$scope.convertISO8601ToSeconds = function(input) {

		var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
		var hours = 0, minutes = 0, seconds = 0, totalseconds;

		if (reptms.test(input)) {
			var matches = reptms.exec(input);
			if (matches[1]) hours = Number(matches[1]);
			if (matches[2]) minutes = Number(matches[2]);
			if (matches[3]) seconds = Number(matches[3]);
			totalseconds = hours * 3600  + minutes * 60 + seconds;
		}

		return (totalseconds);
	}

		$scope.buildTimeFormat = function(time) {
		var string = time.toString();
		return '' + string.substring(0, string.indexOf('.')) + ':' + string.substring(string.indexOf('.') + 1, string.indexOf('.') + 3) + '';
	};

  });
