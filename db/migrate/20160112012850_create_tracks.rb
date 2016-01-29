class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.references :project, index: true
      t.float :gain

      t.timestamps
    end
  end
end
