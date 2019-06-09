class CreateRecords < ActiveRecord::Migration[5.2]
  def change
    create_table :records do |t|
      t.integer :crystal, null: false, default: 0
      t.integer :time, null: false, default: 0
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
