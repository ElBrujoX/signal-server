-- Create agents table
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  capabilities TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create VM states table
CREATE TABLE vm_states (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('idle', 'running', 'paused', 'error')),
  current_task TEXT,
  memory_usage FLOAT,
  cpu_usage FLOAT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stream stats table
CREATE TABLE stream_stats (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  viewers INTEGER NOT NULL DEFAULT 0,
  uptime INTEGER NOT NULL DEFAULT 0,
  quality TEXT NOT NULL DEFAULT '1080p',
  bitrate INTEGER NOT NULL DEFAULT 6000,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Add initial data
INSERT INTO agents (id, name, description, capabilities, image_url) VALUES
  ('zerebro', 'Zerebro', 'Big brain energy, solving complex problems with style', 
   ARRAY['Problem Solving', 'Data Analysis', 'Research', 'Teaching'],
   'https://i.imgur.com/IdYMfku.jpg'),
  ('gigachad', 'Giga Chad', 'Peak performance in everything, maximum efficiency',
   ARRAY['Workflow Optimization', 'Project Management', 'Leadership', 'Motivation'],
   'https://i.imgur.com/wIvfrp4.jpg'),
  ('chillguy', 'Chill Guy', 'Keeping it cool while getting things done',
   ARRAY['Stress Management', 'Meditation', 'Work-Life Balance', 'Wellness'],
   'https://i.imgur.com/gYatReK.jpg'),
  ('fwog', 'Fwog', 'Hopping through tasks with precision and grace',
   ARRAY['Task Automation', 'System Integration', 'DevOps', 'Infrastructure'],
   'https://i.imgur.com/hknJ5xK.jpg'),
  ('dogwifhat', 'DogWifHat', 'Your loyal companion in digital adventures',
   ARRAY['Social Media', 'Content Creation', 'Community Management', 'Entertainment'],
   'https://i.imgur.com/2dqQuCy.jpg');