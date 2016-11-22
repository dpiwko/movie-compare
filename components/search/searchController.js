/**
 * Created by Dawid on 2016-11-20.
 */
appControllers.controller('SearchController', ['$rootScope', '$scope', '$http', '$timeout', 'Search', 'lodash', function($rootScope, $scope, $http, $timeout, Search, lodash){
    $scope.movies = {};

    $scope.searchMovie = function(title, type){
        if(title !== ''){
            var params = {s: title};
            return $http.get(
                'http://www.omdbapi.com',
                {params: params}
            ).then(function(response){
                $scope.movies[type] = response.data.Search;
            }).catch(function(error){
                console.log(error);
            });
        }
    };

    $scope.getMovie = function(title, type){
        Search.getMovie({t: title}).$promise.then(function(result){
            $scope.movies[type].selected = result;
        }).catch(function(error){
            console.log(error);
        });
    };

    $scope.compareMovie = function(){
        $scope.loading = true;
        $timeout(function(){
            $scope.loading = false;
        }, 5000);
    }
}]);