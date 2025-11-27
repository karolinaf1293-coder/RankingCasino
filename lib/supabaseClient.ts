import { createClient } from '@supabase/supabase-js';

// --- Conexión a Supabase ---
// Los siguientes valores se obtienen desde el panel de tu proyecto en Supabase:
// Configuración del Proyecto > API
const supabaseUrl = 'https://dkndgazqlqxyscfruroh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbmRnYXpxbHF4eXNjZnJ1cm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTUyMzgsImV4cCI6MjA3OTc3MTIzOH0.Ju6ujS46AGpm09gBUhxEMZimLvedx8GkPft0zIMsRMA';

// Se crea y exporta el cliente de Supabase para usarlo en la aplicación.
export const supabase = createClient(supabaseUrl, supabaseKey);
