myapp.controller('QustionnaireCtrl', ['$scope', 'questionnaire', 'questionnaires', 'questions', 'qustionnaries_questions' ,
  function($scope, questionnaire, questionnaires, questions, qustionnaries_questions){

  $scope.questionnaire = questionnaire;

  questions.getAll();
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