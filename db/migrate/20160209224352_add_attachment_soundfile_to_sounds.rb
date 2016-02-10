class AddAttachmentSoundfileToSounds < ActiveRecord::Migration
  def self.up
    change_table :sounds do |t|
      t.attachment :soundfile
    end
  end

  def self.down
    remove_attachment :sounds, :soundfile
  end
end
