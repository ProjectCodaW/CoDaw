class SoundObject < ActiveRecord::Base
  belongs_to :track
  belongs_to :sound
end
