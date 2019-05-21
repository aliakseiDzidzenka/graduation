class SetDefaultCrystalQuanity < ActiveRecord::Migration[5.2]
  def change
  	change_column_default(
  :crystals,
  :quantity,
  from: nil,
  to: 0
)
  end
end
