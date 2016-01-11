class CommentsController < ApplicationController
	before_action :authenticate_user!, except: :index

	def index
		@comments = Comment.where(story_id: params[:story_id])
		respond_to do |format|
			format.html
			format.json { render json: @comments }
		end 
	end

	def create
		@story = Story.find(params[:story_id])
		@comment = @story.comments.create(comment_params)
		@comment.user = current_user
		if @comment.save
			redirect_to :back
		else
			flash[:danger] = @comment.errors.full_messages.to_sentence
			render :new
		end
	end

	private
		def comment_params
			params.require(:comment).permit(:body)
		end
end