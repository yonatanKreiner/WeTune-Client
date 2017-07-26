'use strict';

/**
 * @ngdoc function
 * @name weTuneApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the weTuneApp
 */
angular.module('weTuneApp')
  .controller('LoginCtrl', function ($scope, $location, Database, RoomService) {
		// $('#inputPin').pincodeInput({inputs:4});
		// function moveOnMax(field, nextFieldID) {
		// 	if (field.value.length == 1) {
		// 			document.getElementById(nextFieldID).focus();
		// 	}
		// }

		var defaultRoom = {
			name: '',
			pin: '',
			volume: 100,
			users: []
		}
		
		$scope.room = {
			exists: true
		};

		$scope.redirectToRoom = function(name, pin) {
			RoomService.login(name, pin);
			$location.path('/main');
			if(!$scope.$$phase) $scope.$apply();
		}

		$scope.enterRoom = function(room) {
			if (room.exists) {
				$scope.loginRoom(room.name, room.pin);
			} else {
				$scope.tryCreateRoom(room.name, room.pin);				
			}
		}

    $scope.tryCreateRoom = function(name, pin) {
			if ($scope.doesRoomExist(name, function(err, doesExist) {
				if (err) {
					$scope.error = err.message;
				} else if(doesExist) {
					$scope.error = 'room already exists'
					if(!$scope.$$phase) $scope.$apply();					
				} else {
					$scope.createRoom(name, pin);
					$scope.redirectToRoom(name, pin);
				}
			}));
		}

		$scope.loginRoom = function(name, pin) {
			if ($scope.checkRoom(name, pin, function(err, didLogin) {
				if (err || !didLogin) {
					$scope.error = 'wrong credentials';
				} else {
					$scope.redirectToRoom(name, pin);
				}

				if(!$scope.$$phase) $scope.$apply();
			}));
		}

		$scope.checkRoom = function(roomName, roomPin, callback) {
			Database.ref("rooms/" + roomName).on("value", function(room){
				if (room.val()) {
					callback(null, room.val().pin == roomPin);
				} else {
					callback(null, false);
				}
			}, function(err) {
				callback(err, false);
			});
		}

		$scope.doesRoomExist = function(roomName, callback) {
			Database.ref("rooms/" + roomName).on("value", function(room){
				if (room.val()) {
					callback(null, true);
				} else {
					callback(null, false);
				}
			}, function(err) {
				callback(err, false);
			});
		}

		$scope.createRoom = function(roomName, roomPin) {
			defaultRoom.name = roomName;
			defaultRoom.pin = roomPin;

			var room = defaultRoom;

			console.log(room);
			
			var db = Database.ref();
			db.child("rooms/" + roomName).set(room);
		}
  });
