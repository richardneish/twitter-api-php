angular.module('tweetsApp', ['ngSanitize'])
  .controller('TweetController', ['$scope', '$http', function($scope, $http) {
    $scope.status='Loading';

    $http.get('api/timeline.php')
    .success(function(data, status, headers, config) {
      $scope.tweets = data;

      // Expand all URLs in the tweet.
      $scope.tweets.forEach(function(tweet,i) {
        tweet.expanded_text = tweet.text;
        tweet.entities.urls.forEach(function(url,i) {
          tweet.expanded_text = tweet.expanded_text.replace(url.url,
            '<a href="' + url.expanded_url + '">' + url.expanded_url + '</a>');
        });
      });

      $scope.status='Loaded';

    });
  }]);
