class ChangeColumnToMessages < ActiveRecord::Migration[5.0]
  def change
    change_column :messages, :body, :text, index: true
  end
end
