Rails.application.routes.draw do
  get 'game/index'
  get 'game/plane'
  get 'game/test'

  devise_for :users
  get 'welcome/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  get '/flamingo_load', to: 'welcome#load'

  resources :crystals, only: [:index, :show, :new, :create, :edit, :update]

end
