app.config(function ($stateProvider) {
    $stateProvider.state('OneReview', {
        url: '/reviews/write',
        template: '<review-writer></review-writer>',
        controller: 'ReviewController'
        // ,
        // resolve: {
        //   oneReview: function($stateParams, ReviewFactory) {
        //     return ReviewFactory.getOneReview($stateParams.reviewId)
        //   }
        // }
    });
});


app.config(function ($stateProvider) {
    $stateProvider.state('ProductReviews', {
        url: '/product/reviews/:productId',
        template: '<div class="pre-review-box" ng-repeat="review in productReviews">'+
                      '<review-box review="review"></review-box>' +
                  '</div>',
        controller: 'ProductReviewsController',
        resolve: {
          productReviews: function($stateParams, ReviewFactory) {
            return ReviewFactory.getReviewsForProduct($stateParams.productId)
          }
        }
    });
});


