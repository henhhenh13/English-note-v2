import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yygawohhkenacgqzqkgf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Z2F3b2hoa2VuYWNncXpxa2dmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1OTUyNTgsImV4cCI6MjA0NzE3MTI1OH0.42eN_qazH-2NE6B7Z--VBoplHdoCroTwkUYVTZUl66Y';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);