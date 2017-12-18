class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  scope :sent_order, -> { order("created_at ASC") }

  validates :body, presence: true
end
