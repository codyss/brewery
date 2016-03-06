app.controller('ReviewController', function($scope, ReviewFactory, $state) {

  $scope.reviewIsReadonly = false;

  $scope.saveReview = function (productId) {
    ReviewFactory.saveReview({
      product: productId,
      stars: $scope.rating,
      content: $scope.reviewContent
    })
    $state.go('oneProduct', {id: productId})
  }

})

app.controller('ProductReviewsController', function($scope, productReviews) {
  $scope.productReviews = productReviews;
  console.log(productReviews)

})
