class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.float :gain
      t.float :bpm

      t.timestamps
    end
  end
end
