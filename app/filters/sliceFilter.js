angular.module('petProj.filters',[]).filter('slice', function() {
    return function(arr, start, end) {
        return arr.slice(start, end);
    };
});
