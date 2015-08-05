Rails.application.routes.draw do
  root to: "root#root"

  resources(
    :posts,
    defaults: {format: :json},
    only: [:create, :index, :show, :destroy, :update]
  )
end
