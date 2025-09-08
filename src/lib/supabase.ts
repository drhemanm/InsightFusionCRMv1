import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://clgfmgyhrdomimrhkpxx.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsZ2ZtZ3locmRvbWltcmhrcHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNjcyMzIsImV4cCI6MjA3Mjg0MzIzMn0.w2p0qaB11s9yPVWr7keyYDRvyAvT9OUESWkpSB6foEQ'

// Debug logging to check environment variables
console.log('Supabase Environment Check:', {
  url: process.env.REACT_APP_SUPABASE_URL ? 'Found' : 'Missing',
  key: process.env.REACT_APP_SUPABASE_ANON_KEY ? 'Found' : 'Missing',
  finalUrl: supabaseUrl,
  finalKeyLength: supabaseKey.length
});

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers for easy access
export const auth = supabase.auth

// Real-time subscriptions helper
export const subscribe = (table: string, callback: (payload: any) => void) => {
  return supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', 
      { event: '*', schema: 'public', table }, 
      callback
    )
    .subscribe()
}
