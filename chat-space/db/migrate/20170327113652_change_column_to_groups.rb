class ChangeColumnToGroups < ActiveRecord::Migration[5.0]
  def change
    change_column :groups, :name, :string, unique: true, index: true
  end
end
