var myapp = angular.module('pool', ['ui.select', 'ui.router', 'ui.sortable', 'ui.validate']);

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
	  	{title: "Kiedy jedziesz na wakacje za granicą, to wybierasz:", url: '', response: [{'name' : 'testowa odpowiedz'}]},
	  	{title: "Testowy 2 Kiedy jedziesz na wakacje za granicą, to wybierasz", url: '', response: []},
	  	{title: "Testowy 3 Kiedy jedziesz na wakacje za granicą, to wybierasz", url: '', response: []},
	  	{title: "Testowy 4 Kiedy jedziesz na wakacje za granicą, to wybierasz", url: '', response: []},
	  ]
	}
	return o;
}]);


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


myapp.controller('MainCtrl', ['$scope', 'questionnaires', 'questions', function($scope, questionnaires, questions){
  $scope.test = 'Hello world!';

  $scope.questionnaires = questionnaires.questionnaires;
  $scope.questions = questions.questions;
  $scope.name = '';

  $scope.addQuestionnaire = function(){

    if(!$scope.formQuestionnarie.name.$error.pattern && $scope.name != ''){
     
    
    	$scope.questionnaires.push({name: $scope.name});
    	$scope.name='';

    }else{
      $scope.formQuestionnarie.name.$error.pattern = true;
    }
    
    
  };

   $scope.title ='';

   $scope.addQuestion = function(){
    if(!$scope.formQuestion.title.$error.pattern && $scope.title != ''){
      	$scope.questions.push({title: $scope.title, url: $scope.url});
      	$scope.title='';
      	$scope.url='';
    }else{
      $scope.formQuestion.title.$error.pattern = true;
    }
  };

  $scope.deleteQuestion = function(index){
    $scope.questions.splice( index, 1 );
  }

  $scope.deleteQuestionnaire = function(index){
    
    $scope.questionnaires.splice( index, 1 );
  }


  $scope.edit = $scope.questions.map(function(i){return i = false});
  $scope.editQuestionnaire = $scope.questionnaires.map(function(i){return i = false});
    

  $scope.activeEditQuestion = function(index){
    $scope.edit[index] = true;
  }

  $scope.endActiveEditQuestion = function(index){
     

     if(!$scope.formQuestion[index].title.$error.pattern && $scope.formQuestion[index].title.$viewValue.length > 0){
      $scope.edit[index] = false;
     }else{
      $scope.formQuestion[index].title.$error.pattern=true;
     }
  }

  $scope.activeEditQuestionnaire = function(index){
    $scope.editQuestionnaire[index] = true;
   
  }

  $scope.endActiveEditQuestionnaire = function(index){
    if(!$scope.formQuestionnarie[index].name.$error.pattern && $scope.formQuestionnarie[index].name.length>0){
      $scope.editQuestionnaire[index] = false;
    }else{
      $scope.formQuestionnarie[index].name.$error.pattern=true;
    }
  }


}]);



myapp.controller('QustionnaireCtrl', ['$scope', '$stateParams', 'questionnaires', 'questions', 'qustionnaries_questions' ,
  function($scope, $stateParams, questionnaires, questions, qustionnaries_questions){

	$scope.questionnaire = questionnaires.questionnaires[$stateParams.id];
	$scope.questions = questions.questions;
  $scope.qustionnaries_questions = qustionnaries_questions;

 
  $scope.multiple = {};
  $scope.multiple.selectedQuestions = [];
  $scope.$watch('multiple.selectedQuestions', function() {
           $scope.list = $scope.multiple.selectedQuestions;
     });


//sortable  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
    update: function(e, ui) {
      var logEntry = $scope.multiple.selectedQuestions.map(function(i){
      	console.log(i)
        return i.title;
      }).join(', ');
      $scope.sortingLog.push('Update: ' + logEntry);
    },
    stop: function(e, ui) {
      // this callback has the changed model
      var logEntry = $scope.multiple.selectedQuestions.map(function(i){
        return i.title;
      }).join(', ');
      $scope.sortingLog.push('Stop: ' + logEntry);
    }
   }



   $scope.addQuestionsToQuestionnaire = function(){
    $scope.qustionnaries_questions[$stateParams.id] = $scope.multiple.selectedQuestions;
    

   }

}]);


myapp.controller('QustionCtrl', ['$scope', '$stateParams', 'questions',
  function($scope, $stateParams, questions){

   $scope.question = questions.questions[$stateParams.id];


  $scope.inputs = $scope.question.response.map(function(i){return i});

  $scope.editResponseState = $scope.inputs.map(function(i){return i = true});




   $scope.addNewInput = function(){
     $scope.inputs.push({name: ''});
     var i = $scope.inputs.length -1;


     $scope.editResponseState[i] = false;
   }

   $scope.deleteResponse = function(index){
       $scope.inputs.splice( index, 1 );
   }
   
   $scope.formResponse = [];
  

   $scope.addResponse = function(index){

        if(!$scope.formResponse[index].response.$error.pattern && $scope.formResponse[index].response.$viewValue.length>0){
           $scope.question.response = $scope.inputs;
          $scope.editResponseState[index] = true;
        }else{
          $scope.formResponse[index].response.$error.pattern = true; 
        }
     
   }

   $scope.activeEditResponse = function(index){
     $scope.editResponseState[index] = false;
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


    $stateProvider
    .state('question', {
      url: '/question/{id}',
      templateUrl: '/question.html',
      controller: 'QustionCtrl'
    });



  $urlRouterProvider.otherwise('home');
}]);