// En el archivo lib/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// ¡Aquí es donde pegas tus claves!
const supabaseUrl = 'TU_URL_DE_SUPABASE'; 
const supabaseKey = 'TU_CLAVE_ANON_PÚBLICA';

// Obtienes estas claves en tu proyecto de Supabase:
// 1. Ve a "Project Settings" (el ícono de engranaje).
// 2. Haz clic en "API".
// 3. Copia la "Project URL" y pégala en supabaseUrl.
// 4. Copia la clave "anon" (public) y pégala en supabaseKey.

export const supabase = createClient(supabaseUrl, supabaseKey);
