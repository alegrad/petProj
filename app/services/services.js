angular.module('petProj.services',[]);
angular.module('petProj.services').service('bookService', function($resource){
    return $resource('/books/:id',{},{'get': {method: "GET", isArray: true}});
});