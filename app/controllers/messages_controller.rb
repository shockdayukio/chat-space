class MessagesController < ApplicationController

  before_action :set_message, only: [:edit, :update, :destroy]
  def index
    @messages = Message.where(group_id: params[:group_id])
  end

  def new
    @group = Group.find(params[:group_id])
    @message = Message.new
  end

  def create
    @message = Message.create(message_params)
    redirect_to group_messages_path
  end


  def update
    @message = @message.update(message_params)
    redirect_to group_messages_path
  end

  def destroy
    @message = @message.destroy
    redirect_to group_messages_path
  end

  private
  def message_params
    params.require(:message).permit(:body, :image, :group_id, :user_id).merge(group_id: params[:group_id], user_id: current_user.id)
  end

  def set_message
    @message = Message.find(params[:id])
    @group = Group.find(params[:group_id])
  end
end
