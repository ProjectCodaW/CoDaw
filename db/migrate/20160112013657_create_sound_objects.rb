class CreateSoundObjects < ActiveRecord::Migration
  def change
    create_table :sound_objects do |t|
      t.references :track, index: true
      t.integer :projectPosition
      t.references :sound, index: true
      t.integer :start
      t.integer :end
      t.float :playback_rate

      t.timestamps
    end
  end
end
