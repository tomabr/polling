var myapp = angular.module('pool', ['templates', 'ui.select', 'ui.router', 'ui.sortable', 'ui.validate']);




myapp.factory('qustionnaries_questions', [function(){
  var o = {
    qustionnaries_questions: []
  }
  return o;
}]);


myapp.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);
        
      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});














myapp.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home/_home.html',
      controller: 'HomeCtrl'
    });


  $stateProvider
    .state('questionnaire', {
      url: '/questionnaire/{id}',
      templateUrl: 'questionnarie/_questionnarie.html',
      controller: 'QustionnaireCtrl'
    });


    $stateProvider
    .state('question', {
      url: '/question/{id}',
      templateUrl: 'question/_question.html',
      controller: 'QuestionCtrl'
    });



  $urlRouterProvider.otherwise('home');
}]);