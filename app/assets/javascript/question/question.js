myapp.factory('questions', ['$http', function($http){
	

	var o = {
		questions: []
	}

	o.getAll = function() {
	    return $http.get('/questions.json').success(function(data){
	    	
	      angular.copy(data, o.questions);
	    });
  	}

  	o.create = function(question) {

	  return $http.post('/questions.json', question).success(function(data){

	    o.questions.push(data);
	  });
	};


	 o.update = function(question) {

	  return $http.put('/questions/' + question.id + '.json', question).success(function(data){
	  });
	};


	 o.destroy = function(question) {

	  return $http.delete('/questions/' + question.id + '.json', question).success(function(data){
        o.getAll();
	  });
	};


	o.get = function(id) {
	  return $http.get('/questions/' + id + '.json').then(function(res){
	    return res.data;
	  });
	};

	o.addResponse = function(id, response) {
  		return $http.post('/questions/' + id + '/responses.json', response);
	};

	o.getAllResponses = function(id){
		return $http.get('/questions/' + id + '/responses.json');
	}



    o.destroyResponse = function(question_id, id){
    	return $http.delete('/questions/' + question_id + '/responses/' + id + '.json');

    }

     o.updateResponse = function(question_id, id, response){
    	return $http.put('/questions/' + question_id + '/responses/' + id + '.json', response);

    }




	return o;
}]);