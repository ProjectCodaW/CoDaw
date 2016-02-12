class Track < ActiveRecord::Base
  belongs_to :project
  has_many :sound_objects
end
