'use strict';

/**
 * @ngdoc function
 * @name weTuneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weTuneApp
 */
angular.module('weTuneApp')
  .controller('LoginCtrl', function ($scope, $location) {
		$scope.room = {
			exists: true
		};

		$scope.enterRoom = function(room) {
			if (room.exists) {
				$scope.loginRoom(room.name, room.pin);
			} else {
				$scope.createRoom(room.name, room.pin);				
			}
		}

    $scope.createRoom = function(name, pin) {
			if (name === 'room1' && pin === '1234') {
				$location.path('/main')
			} else {
				$scope.error = 'fail'
			}
		}

		$scope.loginRoom = function(name, pin) {
			if (name === 'room2' && pin === '1235') {
				$location.path('/main')
			} else {
				$scope.error = 'fail'
			}
		}
  });
