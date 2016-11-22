/**
 * Created by Dawid on 2016-11-20.
 */
function config($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'components/search/searchView.html',
            controller: 'SearchController',
            data: {pageTitle: 'Home'}
        })
}

angular
    .module('movieCompare')
    .config(config)
    .run(function($rootScope, $state){
        $rootScope.$state = $state;
    });