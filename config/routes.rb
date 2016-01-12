Rails.application.routes.draw do
  devise_for :users  

  resources :stories do
    resources :comments
  	member do
		  put :like,      to: 'stories#upvote'
	  	put :dislike,   to: 'stories#downvote'
      get :user,      to:  'users#story_user'
      get :category,  to: 'categories#story_category'
  	end

    collection do
      get :search
    end
  end

  root 'stories#index'

  get '/all_stories',   to: 'stories#all_stories'
  get '/topstories',    to: 'pages#topstories',    as: 'topstories'
  get '/randomstories', to: 'pages#randomstories', as: 'randomstories'
  get 'category/:id',   to: 'categories#show',     as: 'category'
end
