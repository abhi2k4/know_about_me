-- Drop the table if it already exists to start fresh
DROP TABLE IF EXISTS portfolio_resumes;

-- Create the portfolio_resumes table
CREATE TABLE portfolio_resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT false,
    download_filename TEXT NOT NULL DEFAULT 'Resume.pdf',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NOTE: If you already created this table in a previous step, run this migration command in the Supabase SQL Editor:
-- ALTER TABLE portfolio_resumes ADD COLUMN IF NOT EXISTS download_filename TEXT NOT NULL DEFAULT 'Resume.pdf';

-- Turn off Row Level Security (RLS) for simple public access
-- Since the frontend Arena panel is password-protected, we allow public operations here
ALTER TABLE portfolio_resumes DISABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- STORAGE BUCKET SETUP
-- -------------------------------------------------------------

-- Create a new public bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Set up permissive policies for the resumes bucket

-- 1. Allow public to select/read objects
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'resumes');

-- 2. Allow public (anon) to insert/upload objects
CREATE POLICY "Public Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'resumes');

-- 3. Allow public (anon) to update objects
CREATE POLICY "Public Update" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'resumes');

-- 4. Allow public (anon) to delete objects
CREATE POLICY "Public Delete" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'resumes');
