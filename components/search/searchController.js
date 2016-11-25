/**
 * Created by Dawid on 2016-11-20.
 */
appControllers.controller('SearchController', ['$rootScope', '$scope', '$http', '$timeout', 'Search', 'localStorageService', function($rootScope, $scope, $http, $timeout, Search, localStorageService){
    var count = 0;
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
            $scope.disabledBtn = false;
        }).catch(function(error){
            console.log(error);
        });
    };

    $scope.compareMovie = function(){
        $scope.loading = true;
        var firstCrew = {
                Actors: $scope.movies.firstMovie.selected.Actors.split(', '),
                Director: $scope.movies.firstMovie.selected.Director.split(', ')
            },
            secondCrew = {
                Actors: $scope.movies.secondMovie.selected.Actors.split(', '),
                Director: $scope.movies.secondMovie.selected.Director.split(', ')
            },
            comparedMovies = {},
            index;

        $scope.theSameCrew = {};
        Object.keys(firstCrew).map(function(objKey){
            firstCrew[objKey].map(function(obj){
                index = secondCrew[objKey].findIndex(function(o){ return o == obj; });
                if(index !== -1){
                    $scope.theSameCrew[objKey] = $scope.theSameCrew[objKey] || [];
                    $scope.theSameCrew[objKey].push(secondCrew[objKey][index]);
                }
            });
        });

        $timeout(function(){
            $scope.loading = false;
            $scope.disabledBtn = true;
        });

        comparedMovies = {
            title: [$scope.movies.firstMovie.selected.Title, $scope.movies.secondMovie.selected.Title]
        };
        setHistory('movieHistory', comparedMovies);
        $scope.savedHistory = getHistory('movieHistory');
    };

    function getHistory(name){
        return localStorageService.get(name);
    }
    $scope.savedHistory = getHistory('movieHistory');

    function setHistory(name, object){
        var history = getHistory(name) || [];
        history.push(object);
        localStorageService.set(name, history);
    }
}]);