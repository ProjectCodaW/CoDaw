class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.float :gain
      t.float :bpm
      t.string :time_sig

      t.timestamps
    end
  end
end
