class StoriesController < ApplicationController
	before_action :authenticate_user!, only: [:new, :create, :upvote, :downvote]  #comes from devise
	def index
		@stories = Story.all.order(id: :desc).page(params[:page]).per(5)
		@categories = Category.all
		respond_to do |format|
			format.html
			format.json { render json: @stories.to_json }
		end
	end

	def new
		@story = Story.new
	end

	def create
		@story = Story.new(story_param)
		@story.user = current_user
		if @story.save
			redirect_to @story
		else
			flash[:danger] = @story.errors.full_messages.to_sentence
			render :new
		end
	end

	def show
		@story = Story.find(params[:id])
		@comments = Comment.where(story_id: @story)
	end

	def upvote	
		@story = Story.find(params[:id])	
		@story.upvote_by(current_user)
		render json: @story
	end

	def downvote	
		@story = Story.find(params[:id])	
		@story.downvote_by(current_user)
		render json: @story
	end

	def search
		if params[:search].blank?
			@storeis = Story.all
		else
			@stories = Story.search(params)
		end
	end

	private

		def story_param
			params.require(:story).permit(:body, :scary, :category_id)
		end
end