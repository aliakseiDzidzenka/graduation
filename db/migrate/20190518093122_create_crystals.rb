class CreateCrystals < ActiveRecord::Migration[5.2]
  def change
    create_table :crystals do |t|
      t.references :user, foreign_key: true
      t.integer :quantity

      t.timestamps
    end
  end
end
