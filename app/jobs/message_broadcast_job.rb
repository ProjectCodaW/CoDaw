class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast 'messages', render_message(message)
  end

  private
  def render_message(message)
    ApplicationController.renderer.render(json: message)
  end
end
