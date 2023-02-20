Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root to: 'application#app'

  namespace :api, constraints: { format: "json" } do
    resources :organizations, only: [:index, :show] do
      resources :filings, only: [:index, :show] do
        resources :awards, only: [:index, :show]
      end
      resources :addresses, only: [:index, :show]
    end
  end

  get '*path', to: 'application#app'
end
