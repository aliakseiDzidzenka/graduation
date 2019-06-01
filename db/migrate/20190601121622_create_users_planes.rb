class CreateUsersPlanes < ActiveRecord::Migration[5.2]
  def change
    create_table :users_planes, id: false do |t|
    	t.belongs_to :user, index: true
      t.belongs_to :plane, index: true
    end
  end
end
