class Message < ActiveRecord::Base
  after_create_commit { MessageBroadcastJob.perform_later self }
end
