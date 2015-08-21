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
      controller: 'HomeCtrl',
      resolve: {
        postPromise: ['questionnaires', 'questions', function(questionnaires, questions){
          return questionnaires.getAll() + questions.getAll();
        }],

      
      }



    });


  $stateProvider
    .state('questionnaire', {
      url: '/questionnaire/{id}',
      templateUrl: 'questionnaire/_questionnaire.html',
      controller: 'QustionnaireCtrl',
      resolve: {
          questionnaire: ['$stateParams', 'questionnaires', function($stateParams, questionnaires) {
            return questionnaires.get($stateParams.id);
          }]
        }
    });


    $stateProvider
    .state('question', {
      url: '/question/{id}',
      templateUrl: 'question/_question.html',
      controller: 'QuestionCtrl',
      resolve: {
          question: ['$stateParams', 'questions', function($stateParams, questions) {
            return questions.get($stateParams.id);
          }]
        }

    });



  $urlRouterProvider.otherwise('home');
}]);