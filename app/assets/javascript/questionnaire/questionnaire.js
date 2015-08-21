myapp.factory('questionnaires', ['$http', function($http){
	var o = {
		questionnaires:  []
	}

	o.getAll = function() {
	    return $http.get('/questionnaires.json').success(function(data){
	      angular.copy(data, o.questionnaires);
	    });
  	};

  	o.create = function(questionnaire) {

	  return $http.post('/questionnaires.json', questionnaire).success(function(data){

	    o.questionnaires.push(data);
	  });
	};


	 o.update = function(questionnaire) {
	  return $http.put('/questionnaires/' + questionnaire.id + '.json', questionnaire).success(function(data){
	    o.getAll();
	  });
	};


	 o.destroy = function(questionnaire) {

	  return $http.delete('/questionnaires/' + questionnaire.id + '.json', questionnaire).success(function(data){
        o.getAll();
	  });
	};




     

	return o;
}]);

