class ChangeCostNameOnPlanes < ActiveRecord::Migration[5.2]
  def change
  	rename_column :planes, :cost, :price
  end
end
