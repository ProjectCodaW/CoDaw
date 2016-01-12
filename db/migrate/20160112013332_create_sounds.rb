class CreateSounds < ActiveRecord::Migration
  def change
    create_table :sounds do |t|
      t.float :bpm
      t.integer :duration

      t.timestamps
    end
  end
end
