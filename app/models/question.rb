class Question < ActiveRecord::Base
	has_many :responses

	 def as_json(options = {})
    	super(options.merge(include: :responses))
  	end
end
