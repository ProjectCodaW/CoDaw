class SoundsController < ApplicationController

  def new
    @sound = Sound.new
  end

  def create
    @sound = Sound.create(sound_params)
    redirect_to new_sound_path
  end

private
  # Use strong_parameters for attribute whitelisting
  # Be sure to update your create() and update() controller methods.
  def sound_params
    params.require(:sound).permit(:soundfile)
  end

end
