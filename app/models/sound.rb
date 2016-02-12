class Sound < ActiveRecord::Base
  has_many :sound_objects, dependent: :destroy
  has_attached_file :soundfile
  validates_attachment :soundfile,
    :content_type => { :content_type => ["audio/mpeg", "audio/mp3"] },
    :file_name => { :matches => [/mp3\Z/] }
end
