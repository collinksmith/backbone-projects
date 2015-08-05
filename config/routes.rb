Rails.application.routes.draw do
  root to: "root#root"

  namespace :api, defaults: { format: :json } do
    resources(
      :posts,
      # defaults: {format: :json},
      only: [:create, :index, :show, :destroy, :update]
    )
  end
end
