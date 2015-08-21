class ResponsesController < ApplicationController
  def create
    question = Question.find(params[:question_id])
    response = question.responses.create(response_params)
    respond_with question, response
  end

 def index
 	question = Question.find(params[:question_id])
 	response = question.responses.all
 	respond_with question, response
 end


def show
	question = Question.find(params[:question_id])
 	response = question.responses.find(params[:id])
 	respond_with question, response

end

def destroy
	question = Question.find(params[:question_id])
	response = question.responses.find(params[:id])
	response.destroy


	response_with

end

def update
	question = Question.find(params[:question_id])
	response = question.responses.find(params[:id])
	response.update!(response_params)

	response_with question, response
end


  private
  def response_params
    params.require(:response).permit(:name)
  end
end
