'use strict';

/**
 * @ngdoc function
 * @name weTuneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weTuneApp
 */
angular.module('weTuneApp')
  .controller('LoginCtrl', function ($scope) {
		$scope.enterRoom = function(room) {
			if (room.exists) {
				$scope.loginRoom(room.name, room.pin);
			} else {
				$scope.createRoom(room.name, room.pin);				
			}
		}

    $scope.createRoom = function(name, pin) {
			if (name === 'room1' && pin === '1234') {
				alert('create');
			} else {
				alert('fail');
			}
		}

		$scope.loginRoom = function(name, pin) {
			if (name === 'room2' && pin === '1235') {
				alert('login');
			} else {
				alert('fail');
			}
		}
  });
