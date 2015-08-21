class QuestionsController < ApplicationController

  def index
    respond_with Question.all
  end


  def create
    respond_with Question.create(question_params)
  end


  def show
    respond_with Question.find(params[:id])
  end

  def update
  	question = Question.find(params[:id])
  	question.update!(question_params)

  	respond_with question

  end

  def destroy
  	question = Question.find(params[:id])
  	question.destroy

  	respond_with 

  end


  private
  def question_params
    params.require(:question).permit(:title)
  end
end
