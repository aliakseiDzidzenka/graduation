class AddNicknameToUser < ActiveRecord::Migration[5.2]
  def change
  		add_column :users, :nickname, :string, limit: 20
  		add_index :users, :nickname, unique: true
  end
end
