myapp.factory('questions', [function(){
	var o = {
		questions:  []
	}

	o.getAll = function() {
	    return $http.get('/questions.json').success(function(data){
	      angular.copy(data, o.questions);
	    });
  	};

  	o.create = function(questionnaire) {

	  return $http.post('/questions.json', question).success(function(data){

	    o.questionnaires.push(data);
	  });
	};


	 o.update = function(questionnaire) {
	  return $http.put('/questions/' + question.id + '.json', question).success(function(data){
	    o.getAll();
	  });
	};


	 o.destroy = function(questionnaire) {

	  return $http.delete('/questions/' + question.id + '.json', questione).success(function(data){
        o.getAll();
	  });
	};



	return o;
}]);