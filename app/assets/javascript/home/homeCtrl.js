myapp.controller('HomeCtrl', ['$scope', 'questionnaires', 'questions', function($scope, questionnaires, questions){
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

