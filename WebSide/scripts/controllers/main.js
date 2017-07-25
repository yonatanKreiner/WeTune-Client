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
//vm.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + "cxG-kOTMgaA");
	vm.src = "cxG-kOTMgaA";

Database.ref("rooms/" + vm.name + "/songs").on("value", function(data){
	vm.songs = data.val();
	if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
		$scope.$apply();
	}
	console.log(vm.songs);
});

  // $scope.$on('youtube.player.ended', function ($event, player) {

	// 	vm.src = vm.songs[0].url;
	// 	player.playVideo();
  // })

	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	var player;
	function onYouTubeIframeAPIReady() {
		player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: vm.src,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	function onPlayerReady(event) {

		event.target.playVideo();
	}

	var done = false;
	function onPlayerStateChange(event) {
		if (event.data == YT.PlayerState.ENDED && !done) {
			player.nextVideo();
			done = true;
		}
	}
	
	function stopVideo() {
		// status stopped
		player.stopVideo();
	}

	function setVolume(volume) {
		player.setVolume(volume);
	}

	});
