class Sound < ActiveRecord::Base
  has_many :sound_objects, dependent: :destroy
end
