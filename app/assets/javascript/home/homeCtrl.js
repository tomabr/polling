myapp.controller('HomeCtrl', ['$scope', 'questionnaires', 'questions', function($scope, questionnaires, questions){
  $scope.test = 'Hello world!';

  $scope.questionnaires = questionnaires.questionnaires;
  $scope.questions = questions.questions;
  $scope.name = '';

  $scope.addQuestionnaire = function(){

    if(!$scope.formQuestionnarie.name.$error.pattern && $scope.name != ''){
     
    
    	//$scope.questionnaires.push({name: $scope.name});
    	//$scope.name='';

      questionnaires.create({
        name: $scope.name,
      });
      $scope.name='';


    }else{
      $scope.formQuestionnarie.name.$error.pattern = true;
    }
    
    
  };

   $scope.title ='';

   $scope.addQuestion = function(){
    if(!$scope.formQuestion.title.$error.pattern && $scope.title != ''){

      	//$scope.questions.push({title: $scope.title});
      	//$scope.title='';

         questions.create({
          title: $scope.title,
        });
         $scope.title='';
    
    }else{
      $scope.formQuestion.title.$error.pattern = true;
    }
  };

  $scope.deleteQuestion = function(question){
    //$scope.questions.splice( index, 1 );
     questions.destroy(question);

  }

  $scope.deleteQuestionnaire = function(questionnaire){
    
   // $scope.questionnaires.splice( index, 1 );
   questionnaires.destroy(questionnaire);

  }


  $scope.edit = $scope.questions.map(function(i){return i = false});
  $scope.editQuestionnaire = $scope.questionnaires.map(function(i){return i = false});
    

  $scope.activeEditQuestion = function(index){
    $scope.edit[index] = true;
  }

  $scope.endActiveEditQuestion = function(index){
     

     if(!$scope.formQuestion[index].title.$error.pattern && $scope.formQuestion[index].title.$modelValue.length > 0){
      questions.update({
        id: $scope.formQuestion[index].id.$modelValue, 
        name: $scope.formQuestion[index].title.$modelValue
      });

      $scope.edit[index] = false;
     }else{
      $scope.formQuestion[index].title.$error.pattern=true;
     }
  }

  $scope.activeEditQuestionnaire = function(index){
    $scope.editQuestionnaire[index] = true;
   
  }

  $scope.endActiveEditQuestionnaire = function(index){
    if(!$scope.formQuestionnarie[index].name.$error.pattern && $scope.formQuestionnarie[index].name.$modelValue.length>0){
        
      questionnaires.update({
        id: $scope.formQuestionnarie[index].id.$modelValue, 
        name: $scope.formQuestionnarie[index].name.$modelValue
      });

      $scope.editQuestionnaire[index] = false;
   
    }else{
      $scope.formQuestionnarie[index].name.$error.pattern=true;
    }
  }


}]);

