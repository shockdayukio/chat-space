class GroupsController < ApplicationController
  def new
    @group = Group.new
  end

  def create
    @group = Group.create(group_params)
    redirect_to controller: :chat, action: :index
  end

  private
  def group_params
    params.require(:group).permit(:name,{ user_ids: []})
  end
end
