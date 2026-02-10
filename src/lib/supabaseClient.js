import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uarwrxxnlweigiflzozd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcndyeHhubHdlaWdpZmx6b3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDIxNDksImV4cCI6MjA4NTY3ODE0OX0.HAQfOQQM0iLWR7R_lzvT1SOL5Ks2yhyOfWlkv4xn1mw'

// 创建并导出单例
export const supabase = createClient(supabaseUrl, supabaseAnonKey)