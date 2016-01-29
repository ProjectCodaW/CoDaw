# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160112013657) do

  create_table "projects", force: true do |t|
    t.float    "gain",       limit: 24
    t.float    "bpm",        limit: 24
    t.string   "time_sig"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sound_objects", force: true do |t|
    t.integer  "track_id"
    t.integer  "project_position", limit: 8
    t.integer  "sound_id"
    t.integer  "ticks_from_start", limit: 8
    t.integer  "ticks_from_end",   limit: 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sound_objects", ["sound_id"], name: "index_sound_objects_on_sound_id", using: :btree
  add_index "sound_objects", ["track_id"], name: "index_sound_objects_on_track_id", using: :btree

  create_table "sounds", force: true do |t|
    t.float    "bpm",        limit: 24
    t.integer  "duration",   limit: 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tracks", force: true do |t|
    t.integer  "project_id"
    t.float    "gain",       limit: 24
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tracks", ["project_id"], name: "index_tracks_on_project_id", using: :btree

end
