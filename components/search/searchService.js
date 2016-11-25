/**
 * Created by Dawid on 2016-11-20.
 */
appServices.factory('Search', ['$resource', function($resource){
    var Search = $resource({}, {},
        {
            getMovie: {
                url: 'http://www.omdbapi.com',
                method: 'GET'
            }
        });
    return Search;
}]);

appServices.filter('isEmpty', [function(){
    return function(object) {
        return angular.equals({}, object);
    }
}]);