angular.module("petProjLibrary", ['ui.router', 'ngResource', 'ngAnimate', 'mgcrea.ngStrap', 'petProj.services', 'petProj.controllers', 'petProj.directives']);

angular.module("petProjLibrary").config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state('book-list', {
            url: '/',
            template: '<book-list ' +
            'current-category="main.currentCategory" ' +
            'books="main.books" ' +
            'begin="main.begin" ' +
            'end="main.end" ' +
            '</book-list>'
        })
        .state('single-book', {
            url: '/books/:id',
            controller: 'SingleBookController',
            template: '<single-book></singlebook>',
            redirectTo: 'single-book.info'
        })
        .state('single-book.info', {
            url: '/',
            templateUrl: '/templates/single-book-info.html'
        })
        .state('single-book.description', {
            url: '/',
            templateUrl: '/templates/single-book-description.html'
        });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});

angular.module("petProjLibrary").filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});