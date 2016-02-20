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

ActiveRecord::Schema.define(version: 20160209224352) do

  create_table "projects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.float    "gain",       limit: 24
    t.float    "bpm",        limit: 24
    t.string   "time_sig"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sound_objects", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "track_id"
    t.integer  "project_position", limit: 8
    t.integer  "sound_id"
    t.integer  "ticks_from_start", limit: 8
    t.integer  "ticks_from_end",   limit: 8
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["sound_id"], name: "index_sound_objects_on_sound_id", using: :btree
    t.index ["track_id"], name: "index_sound_objects_on_track_id", using: :btree
  end

  create_table "sounds", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.float    "bpm",                    limit: 24
    t.integer  "duration",               limit: 8
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "soundfile_file_name"
    t.string   "soundfile_content_type"
    t.integer  "soundfile_file_size"
    t.datetime "soundfile_updated_at"
  end

  create_table "tracks", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci" do |t|
    t.integer  "project_id"
    t.float    "gain",       limit: 24
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["project_id"], name: "index_tracks_on_project_id", using: :btree
  end

end
