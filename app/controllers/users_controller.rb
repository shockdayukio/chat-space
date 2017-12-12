class UsersController < ApplicationController
  def index
    @users = User.where.not(id: user_params[:group_members]).where('name LIKE(?)', "%#{user_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def user_params
    params.permit(:keyword, group_members: [])
  end
end
