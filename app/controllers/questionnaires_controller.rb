class QuestionnairesController < ApplicationController


  def index
    respond_with Questionnaire.all
  end


  def create
    respond_with Questionnaire.create(questionnaire_params)
  end


  def show
    respond_with Questionnaire.find(params[:id])
  end

  def update
  	questionnaire = Questionnaire.find(params[:id])
  	questionnaire.update!(questionnaire_params)

  	respond_with questionnaire

  end

  def destroy
  	questionnaire = Questionnaire.find(params[:id])
  	questionnaire.destroy

  	respond_with 
  end





  private
  def questionnaire_params
    params.require(:questionnaire).permit(:name)
  end

end
