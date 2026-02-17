import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uoheaxffwwonsxnxrkaw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaGVheGZmd3dvbnN4bnhya2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MjcwMDEsImV4cCI6MjA4NjIwMzAwMX0.KiUxiOgVwSdh7PATn_31GNked8BXgh3EeQ3GCyfD0i8'
const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing Supabase connection...')

    // 1. Check if we can connect at all (e.g. by fetching specific table, or just basic health check if possible)
    // Since we don't have a public table guaranteed, we'll try to fetch empty data from 'workspace_assets' 
    // to also verify if the table exists.

    console.log('Querying workspace_assets...')
    const { data, error } = await supabase
        .from('workspace_assets')
        .select('count', { count: 'exact', head: true })

    if (error) {
        console.error('Connection failed or table missing:', error.message)
        if (error.code === '42P01') {
            console.error('Table "workspace_assets" does not exist. Please run the schema setup SQL.')
        }
    } else {
        console.log('Connection successful! Table "workspace_assets" exists.')
    }
}

testConnection()
