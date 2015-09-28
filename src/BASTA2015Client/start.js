!function () {
    'use strict';

    window.app = angular.module('basta', ['ngRoute']);

    window.app.config(function($routeProvider){
        $routeProvider.when('/', {
            controller: 'listController',
            templateUrl: 'list.html'
        }).when('/detail/:hugo', {
            controller: 'detailController',
            templateUrl: 'detail.html'
        });
    });

    /**
     * @public
     * @param $http
     * @constructor
     */
    function DataService($http) {
        /**
         * Loads all articles.
         * @returns {Promise}
         */
        this.loadArticles = function () {
            return $http.get('https://ngmd.azurewebsites.net/api/articlesdemo')
                .then(function(response){
                    return response.data;
                })
                //.then(function(daten){
                //    daten.$internalInfo = {};
                //    return daten;
                //})
                .catch(function(error){
                    console.log('Whoops: ', error);
                }); // .then(null, function(){})
        };

        /**
         * Load a single article.
         * @param {string} id
         * @returns {Promise}
         */
        this.loadArticle = function (id) {
            return $http.get('https://ngmd.azurewebsites.net/api/articlesdemo/' + id)
                .then(function(response){
                    return response.data;
                })
                //.then(function(daten){
                //    daten.$internalInfo = {};
                //    return daten;
                //})
                .catch(function(error){
                    console.log('Whoops: ', error);
                }); // .then(null, function(){})
        };
    }

    window.app.service('dataService', DataService);

    /**
     * @param $scope
     * @param $location
     * @param {DataService} dataService
     * @constructor
     */
    function ListController($scope, $location, dataService){
        dataService.loadArticles()
            .then(function(articles){
                $scope.articles = articles.Items;
            });

        $scope.gotoDetail = function(article) {
            debugger;
            $location.path('/detail/' + article.Id);
        };
    }

    window.app.controller('listController', ListController);

    function DetailController($scope, $routeParams, dataService){
        dataService.loadArticle($routeParams.hugo)
            .then(function(article){
                $scope.article = article;
            });
    }

    function BastaList() {
        return {
            restrict: 'E',
            templateUrl: 'bastaList.html',
            scope: {
                items: '=',
                gotoDetail: '&'
            }
        };
    }

    window.app.directive('bastaList', BastaList);

    window.app.controller('detailController', DetailController);
}();
