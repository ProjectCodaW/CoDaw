Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :sounds

  match '/websocket', to: ActionCable.server, via: [:get, :post]

  mount_ember_app :frontend, to: "/"
  # Serve websocket cable requests in-process
  # mount ActionCable.server => '/cable'
end
