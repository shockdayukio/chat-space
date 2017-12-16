class MessagesController < ApplicationController
  before_action :set_group, only: %i(index create)

  def index
    @members = @group.users.map{|user| user[:name]}.join(' ')
    @message = Message.new
    @messages = @group.messages.newest_order

    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group)}
        format.json
      end
    else
      flash[:notice] = "メッセージを入力してください"
      render :index
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:body ,:image).merge(group_id: params[:group_id], user_id: current_user.id)
  end
end
