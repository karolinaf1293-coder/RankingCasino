// En el archivo lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// ¡Aquí es donde pegas tus claves!
const supabaseUrl = 'https://dkndgazqlqxyscfruroh.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbmRnYXpxbHF4eXNjZnJ1cm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTUyMzgsImV4cCI6MjA3OTc3MTIzOH0.Ju6ujS46AGpm09gBUhxEMZimLvedx8GkPft0zIMsRMA
';

// Obtienes estas claves en tu proyecto de Supabase:
// 1. Ve a "Project Settings" (el ícono de engranaje).
// 2. Haz clic en "API".
// 3. Copia la "Project URL" y pégala en supabaseUrl.
// 4. Copia la clave "anon" (public) y pégala en supabaseKey.

export const supabase = createClient(supabaseUrl, supabaseKey);
