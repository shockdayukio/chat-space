class UsersController < ApplicationController
  def search
    @users = User.where.not(id: user_params[:not_searched_list]).where('name LIKE(?)', "%#{user_params[:keyword]}%")
    respond_to do |format|
      format.html
      format.json
    end
  end

  def user_params
    params.permit(:keyword, not_searched_list: [])
  end
end
