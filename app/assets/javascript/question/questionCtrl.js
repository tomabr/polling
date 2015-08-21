myapp.controller('QuestionCtrl', ['$scope', 'question', 'questions',
  function($scope, question, questions){



  $scope.question = question;




  $scope.inputs = $scope.question.responses.map(function(i){return i});

  $scope.editResponseState = $scope.inputs.map(function(i){return i = true});

  $scope.editResponseStateAfterAdd = $scope.inputs.map(function(i){return i = true});
  
  



   $scope.addNewInput = function(){
     $scope.inputs.push({name: ''});
     var i = $scope.inputs.length -1;


     $scope.editResponseState[i] = false;
   }

   $scope.deleteResponse = function(index, id){
       

        questions.destroyResponse(question.id, id);
        $scope.inputs.splice( index, 1 );

   }
   
   $scope.formResponse = [];
  

   $scope.addResponse = function(index, nm){

        if(!$scope.formResponse[index].response.$error.pattern && $scope.formResponse[index].response.$viewValue.length>0){
           //$scope.question.response = $scope.inputs;

           questions.addResponse(question.id, {name: nm}).success(function(response){


            $scope.question.responses.push(response);
            $scope.inputs = $scope.question.responses.map(function(i){return i});
            $scope.editResponseState[index] = true;
            $scope.editResponseStateAfterAdd[index] = true;
           });

          
        }else{
          $scope.formResponse[index].response.$error.pattern = true; 
        }
     
   }

  $scope.formResponseEdit = [];
  $scope.editResponse = function(index, id, nm){

         if(!$scope.formResponseEdit[index].response.$error.pattern && $scope.formResponseEdit[index].response.$viewValue.length>0){

            questions.updateResponse(question.id, id, {name: nm});

            $scope.editResponseStateAfterAdd[index] = true;
         }else{
             $scope.formResponseEdit[index].response.$error.pattern = true; 
         }
  }


   $scope.activeEditResponseAfterAdd = function(index){
     $scope.editResponseStateAfterAdd[index] = false;
   }


}]);

