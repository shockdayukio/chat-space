class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text :body
      t.string :image, null: false
      t.references :group, foreign_key: true, null: false, index: true
      t.references :user, foreign_key: true, null: false, index: true
      t.timestamps null: false
    end
  end
end