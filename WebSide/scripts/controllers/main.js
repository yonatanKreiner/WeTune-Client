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
	vm.name = "room5";
	vm.code = "1234";
	//vm.name = RoomService.name;
	//vm.pin = RoomService.pin;
	vm.src = "XIMLoLxmTDw";



Database.ref("rooms/" + vm.name + "/volume").on("value", function(data){
	vm.player.setVolume(data.val());
});

Database.ref("rooms/" + vm.name + "/status").on("value", function(data){
	if(data.val() && vm.player)
		{
			vm.player.playVideo();
		}else{
			vm.player.pauseVideo();
		}
});

$scope.$on('youtube.player.ready', function ($event, player) {
		vm.player = player;

		Database.ref("rooms/" + vm.name + "/songs").on("value", function(data){
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
  })

  });
