angular.module('petProj.directives', []);

angular.module('petProj.directives')
    .component('sidePanel', {
        templateUrl: "../templates/side-panel.html",
        controller: SidePanelController,
        bindings: {
            categories: '=',
            currentCategory: '=',
            end: '=',
            begin: '='
        }
    })
    .component('bookList', {
        templateUrl: "../templates/book-list.html",
        controller: BookListController,
        bindings: {
            currentCategory: '=',
            books: '=',
            end: '=',
            begin: '='
        }
    })
    .component('itemBook', {
        templateUrl: '../templates/item-book.html',
        controller: ItemBookController,
        bindings: {
            book: '<'

        }

    })
    .component('singleBook', {
        templateUrl: '../templates/single-book.html',
        controller: SingleBookController,
        bindings: {
           books: '='
        }

    });
