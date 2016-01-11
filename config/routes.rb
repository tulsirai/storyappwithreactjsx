Rails.application.routes.draw do
  devise_for :users  

  resources :stories do
    resources :comments
  	member do
		put :like, to: 'stories#upvote'
	  	put :dislike, to:'stories#downvote'
  	end

    collection do
      get :search
    end
  end

  root 'stories#index'

  get '/topstories', to: 'pages#topstories', as: 'topstories'
  get '/randomstories', to: 'pages#randomstories', as: 'randomstories'
  get 'category/:id', to: 'categories#show', as: 'category'
end
