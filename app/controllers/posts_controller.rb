class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)
    if @post.save
      render 'show'
    else
      render json: @post.errors.full_messages, status: :unprocessible_entity
    end
  end

  def index
  end

  def show
  end

  def update
  end

  def destroy
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
