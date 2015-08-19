var myapp = angular.module('pool', ['ui.select', 'ui.router', 'ui.sortable']);

myapp.factory('questionnaires', [function(){
	var o = {
		questionnaires:  [
	  	{name: "Testowy 1"},
	  	{name: "Testowy 2"},
	  	{name: "Testowy 3"}
	  ]
	}
	return o;
}]);

myapp.factory('questions', [function(){
	var o = {
		questions:  [
	  	{title: "Testowy 1", url: ''},
	  	{title: "Testowy 2", url: ''},
	  	{title: "Testowy 3", url: ''},
	  	{title: "Testowy 4", url: ''},
	  ]
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


myapp.controller('MainCtrl', ['$scope', 'questionnaires', 'questions', function($scope, questionnaires, questions){
  $scope.test = 'Hello world!';

  $scope.questionnaires = questionnaires.questionnaires;
  $scope.questions = questions.questions;


  $scope.addQuestionnaire = function(){
  	$scope.questionnaires.push({name: $scope.name});
  	$scope.title=''
  };

   $scope.addQuestion = function(){
  	$scope.questions.push({title: $scope.title, url: $scope.url});
  	$scope.title='';
  	$scope.url='';
  }


}]);



myapp.controller('QustionnaireCtrl', ['$scope', '$stateParams', 'questionnaires', 'questions' ,function($scope, $stateParams, questionnaires, questions){

	$scope.questionnaire = questionnaires.questionnaires[$stateParams.id];
	$scope.questions = questions.questions;
 

 
  $scope.multiple = {};
  $scope.multiple.selectedQuestions = [];
  $scope.$watch('multiple.selectedQuestions', function() {
           $scope.list = $scope.multiple.selectedQuestions;
     });


//sortable  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
    update: function(e, ui) {
      var logEntry = questions.questions.map(function(i){
      	console.log(i)
        return i.title;
      }).join(', ');
      $scope.sortingLog.push('Update: ' + logEntry);
    },
    stop: function(e, ui) {
      // this callback has the changed model
      var logEntry = questions.questions.map(function(i){
        return i.title;
      }).join(', ');
      $scope.sortingLog.push('Stop: ' + logEntry);
    }
   }

}]);









myapp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });


  $stateProvider
    .state('questionnaire', {
      url: '/questionnaire/{id}',
      templateUrl: '/questionnaire.html',
      controller: 'QustionnaireCtrl'
    });



  $urlRouterProvider.otherwise('home');
}]);