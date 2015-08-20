myapp.controller('QuestionCtrl', ['$scope', '$stateParams', 'questions',
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