require 'rails_helper'
describe Message do
  describe '#create' do
    it "is invalid without a body" do
      message = build(:message, body: nil)
      message.valid?
      expect(message.errors[:body]).to include("を入力してください。")
    end

    it "is valid with a body" do
      message = build(:message)
      message.valid?
      expect(message).to be_valid
    end
  end
end
