class CategoriesController < ApplicationController

	def show
		# @category = Category.find(params[:id])
		@stories = Story.where(category_id: params[:id]).order(id: :desc)
	end

	def story_category
		@story = Story.find(params[:id])
		respond_to do |format|
			format.json { render json: @story.category }
		end
	end
end 