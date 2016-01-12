class CreateSoundObjects < ActiveRecord::Migration
  def change
    create_table :sound_objects do |t|
      t.references :track, index: true
      t.integer :project_position, limit: 8
      t.references :sound, index: true
      t.integer :ticks_from_start, limit: 8
      t.integer :ticks_from_end, limit: 8

      t.timestamps
    end
  end
end
