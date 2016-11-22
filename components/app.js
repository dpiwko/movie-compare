/**
 * Created by Dawid on 2016-11-20.
 */
var app = angular.module('movieCompare', [
    'movieCompare.directives',
    'movieCompare.services',
    'movieCompare.controllers'
]);
var appControllers = angular.module('movieCompare.controllers', [
    'ui.router',
    'ngSanitize',
    'ui.select'
]);
var appServices = angular.module('movieCompare.services', [
    'ngResource',
    'ngLodash'
]);
var appDirectives = angular.module('movieCompare.directives', [
    'ui.router',
    'LocalStorageModule'
]);

app.run(['$rootScope', 'localStorageService', '$state', '$location', '$timeout', '$interval', function($rootScope, localStorageService, $state, $location, $timeout, $interval){

}]);