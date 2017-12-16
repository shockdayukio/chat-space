class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  scope :newest_order, -> { order("created_at ASC") }

  validates :body, presence: true
end
