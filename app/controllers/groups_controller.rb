class GroupsController < ApplicationController

  before_action :set_group, only:[:edit, :update]

  def index
    @user = current_user
    @groups = current_user.groups
  end

  def new
    @group = Group.new
    @user = User.find(selected_user_params[:selected_user_id]) if selected_user_params[:selected_user_id]

    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    binding.pry
    @group = Group.create(group_params)
    if @group.save
      redirect_to group_messages_path(@group), notice: "グループ作成が完了しました。"
    else
      flash.now[:alert] = "グループの作成に失敗しました。"
      render :new
    end
  end

  def edit
  end

  def update
    @group.update(group_params)
    if @group.save
      redirect_to group_path(@group), notice:"グループの更新が完了しました。"
    else
      flash.now[:alert] = "グループの更新に失敗しました。"
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name,{ user_ids: []})
  end

  def selected_user_params
    params.permit(:selected_user_id)
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
