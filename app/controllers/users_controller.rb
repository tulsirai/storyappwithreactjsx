class UsersController < ApplicationController
	def story_user
		@story = Story.find(params[:id])
		respond_to do |format|
			format.html
			format.json { render json: @story.user }
		end
	end
end