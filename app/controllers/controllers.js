angular.module('petProj.controllers', ['mgcrea.ngStrap']);
angular.module('petProj.controllers')
    .controller('MainController', MainController)
    .controller('BookListController', BookListController)
    .controller('SidePanelController', SidePanelController)
    .controller('ItemBookController', ItemBookController)
    .controller('SingleBookController', SingleBookController);


function MainController(bookService, $scope, $alert) {
    var ctrl = this;
    ctrl.begin = 0;
    ctrl.end = 6;
    ctrl.books = bookService.query();
    ctrl.categories = getCategories();
    ctrl.getBookById = getBookById;

    function getCategories() {
        ctrl.books.$promise.then(function () {
            ctrl.categories = (function () {
                var categories = {};
                var books = ctrl.books;
                for (var i = 0; i < books.length; i++) {
                    categories[books[i].category] = books[i].category;
                }

                return categories;
            })();
        });
    }

    function getBookById() {
        /*  ctrl.books.$promise.then(function () {
         ctrl.currentBook = (function () {
         var book = {};
         for (var i = 0; i < ctrl.books.length; i++) {
         if (ctrl.books[i].id == id) {
         book = ctrl.books[i];

         }
         }
         return book;
         })();
         })*/
        console.log('works');
    }

    $scope.$on('bookAdded', function (event, data) {
        console.log('received ' + data.name);
        var alert = $alert({
            templateUrl: '/templates/alert.tpl.html',
            title: data.name + ' added to your cart!',
            content: 'But I didn\'t have enough time to implement it. Sorry :)',
            placement: 'top-right',
            type: 'info',
            show: true,
            duration: 7
        });
    });
}

function BookListController() {
    var ctrl = this;
    ctrl.booksPerPage = 6;
    ctrl.getNumberOfPages = getNumberOfPages;
    ctrl.goToPage = goToPage;

    function getNumberOfPages() {
        var numOfBooks = 0;
        var arr = [];
        var length;
        if (!ctrl.currentCategory) {
            numOfBooks = ctrl.books.length;
        } else {
            for (var i = 0; i < ctrl.books.length; i++) {
                if (ctrl.books[i].category == ctrl.currentCategory) {
                    numOfBooks++;
                }
            }
        }
        length = numOfBooks / ctrl.booksPerPage;
        for (var q = 0; q < length; q++) {
            arr.push(q);
        }
        return arr;

    }

    function goToPage(pageNum) {
        ctrl.begin = pageNum * ctrl.booksPerPage;
        ctrl.end = ctrl.begin + ctrl.booksPerPage;
        console.log(ctrl.begin);
    }

   // console.log(ctrl.currentCategory);

}

function SidePanelController() {
    var ctrl = this;
    ctrl.setCategory = setCategory;
    ctrl.resetLimits = resetLimits;

    function setCategory(category) {
        ctrl.currentCategory = category;
        console.log(ctrl.currentCategory);
    }

    function resetLimits() {
        ctrl.begin = 0;
        ctrl.end = 6;
        console.log(ctrl.begin);
    }
}

function ItemBookController($scope, $modal) {
    var ctrl = this;
    var modal = $modal({
        scope: $scope,
        templateUrl: '/templates/modal.tpl.html',
        show: false
    });
    ctrl.getPositiveRating = getPositiveRating;
    ctrl.getNegativeRating = getNegativeRating;
    ctrl.showModal = showModal;
    ctrl.addToCart = addToCart;

    function getPositiveRating(range) {
        var arr = [];
        for (var i = 0; i < range; i++) {
            arr.push(i);
        }
        return arr;
    }

    function getNegativeRating(range) {
        var count = 5 - range;
        var arr = [];
        for (var i = 0; i < count; i++) {
            arr.push(i);
        }
        return arr;
    }

    function showModal(book) {
        ctrl.currentBook = book;
        modal.$promise.then(modal.show);
    }

    function addToCart(book) {
        console.log('added ' + book.name);
        $scope.$emit('bookAdded', book);
    }
}

function SingleBookController($stateParams, $window, bookService, $scope) {
    var ctrl = this;
    var books = bookService.query();
    //init current book
    books.$promise.then(function () {
        ctrl.book = (function () {
            var book = {};
            for (var i = 0; i < books.length; i++) {
                if (books[i].id == $stateParams.id) {
                    book = books[i];
                    console.log(book.name);
                }
            }
            return book;
        })();
    });
    ctrl.back = goBack;
    ctrl.addToCart = addToCart;

    function goBack() {
        $window.history.back();
    }

    function addToCart(book) {
        console.log('added ' + book.name);
        $scope.$emit('bookAdded', book);
    }

}

