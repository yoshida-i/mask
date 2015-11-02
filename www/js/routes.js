angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('timeLine', {
      url: '/timeline',
      templateUrl: 'templates/timeLine.html',
      controller: 'timeLineCtrl'
    })
        
      
    
      
        
    .state('detail', {
      url: '/post',
      templateUrl: 'templates/detail.html',
      controller: 'detailCtrl'
    })
        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});