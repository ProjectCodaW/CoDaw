class CreateSounds < ActiveRecord::Migration
  def change
    create_table :sounds do |t|
      t.float :bpm
      t.integer :duration, limit: 8

      t.timestamps
    end
  end
end
