Rails.application.routes.draw do
  devise_for :users
  resources :groups, only: [:index, :new, :edit] do
    resources :messages, only:[:index]
  end
  root "groups#index"
end
