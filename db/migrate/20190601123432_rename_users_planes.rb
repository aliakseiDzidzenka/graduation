class RenameUsersPlanes < ActiveRecord::Migration[5.2]
  def change
  	rename_table :users_planes, :planes_users
  end
end
