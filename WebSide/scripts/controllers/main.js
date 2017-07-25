'use strict';

/**
 * @ngdoc function
 * @name weTuneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weTuneApp
 */
angular.module('weTuneApp')
  .controller('MainCtrl', function ($sce) {
	var vm = this;
	vm.name = "סוליסול";
	vm.code = "1234";
	vm.src = $sce.trustAsResourceUrl("https://www.youtube.com/embed/ebXbLfLACGM");


	vm.songs;
  });
