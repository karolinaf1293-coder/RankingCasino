import { Shift } from './types';
import type { Operator } from './types';

// In a real application, this data would come from a Supabase client.
// Example: 
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');
// const { data, error } = await supabase.from('operators').select('*');

export const MOCK_OPERATORS: Operator[] = [
  { id: 1, name: 'Carlos Vega', shift: Shift.AM, satisfaction: 98, quality: 95, avatar: 'https://i.pravatar.cc/150?u=1', chatsHandled: 250, neutralRatings: 5, negativeRatings: 2 },
  { id: 2, name: 'Ana Mendoza', shift: Shift.AM, satisfaction: 95, quality: 97, avatar: 'https://i.pravatar.cc/150?u=2', chatsHandled: 230, neutralRatings: 8, negativeRatings: 1 },
  { id: 3, name: 'Luis Torres', shift: Shift.AM, satisfaction: 92, quality: 90, avatar: 'https://i.pravatar.cc/150?u=3', chatsHandled: 210, neutralRatings: 10, negativeRatings: 4 },
  { id: 4, name: 'Sofia Reyes', shift: Shift.AM, satisfaction: 88, quality: 91, avatar: 'https://i.pravatar.cc/150?u=4', chatsHandled: 200, neutralRatings: 15, negativeRatings: 5 },
  { id: 5, name: 'Javier Rios', shift: Shift.AM, satisfaction: 85, quality: 86, avatar: 'https://i.pravatar.cc/150?u=5', chatsHandled: 190, neutralRatings: 18, negativeRatings: 7 },

  { id: 6, name: 'Mariana Solis', shift: Shift.PM, satisfaction: 99, quality: 96, avatar: 'https://i.pravatar.cc/150?u=6', chatsHandled: 280, neutralRatings: 3, negativeRatings: 1 },
  { id: 7, name: 'Ricardo Lara', shift: Shift.PM, satisfaction: 96, quality: 94, avatar: 'https://i.pravatar.cc/150?u=7', chatsHandled: 260, neutralRatings: 6, negativeRatings: 3 },
  { id: 8, name: 'Elena Franco', shift: Shift.PM, satisfaction: 93, quality: 95, avatar: 'https://i.pravatar.cc/150?u=8', chatsHandled: 240, neutralRatings: 9, negativeRatings: 2 },
  { id: 9, name: 'Daniel Ortiz', shift: Shift.PM, satisfaction: 90, quality: 89, avatar: 'https://i.pravatar.cc/150?u=9', chatsHandled: 220, neutralRatings: 12, negativeRatings: 6 },
  { id: 10, name: 'Valeria Luna', shift: Shift.PM, satisfaction: 87, quality: 88, avatar: 'https://i.pravatar.cc/150?u=10', chatsHandled: 215, neutralRatings: 14, negativeRatings: 8 },

  { id: 11, name: 'Hector Peña', shift: Shift.NT1, satisfaction: 97, quality: 98, avatar: 'https://i.pravatar.cc/150?u=11', chatsHandled: 300, neutralRatings: 4, negativeRatings: 0 },
  { id: 12, name: 'Isabel Cruz', shift: Shift.NT1, satisfaction: 94, quality: 93, avatar: 'https://i.pravatar.cc/150?u=12', chatsHandled: 270, neutralRatings: 7, negativeRatings: 4 },
  { id: 13, name: 'Andres Mora', shift: Shift.NT1, satisfaction: 91, quality: 92, avatar: 'https://i.pravatar.cc/150?u=13', chatsHandled: 255, neutralRatings: 11, negativeRatings: 5 },
  { id: 14, name: 'Gabriela Soto', shift: Shift.NT1, satisfaction: 89, quality: 87, avatar: 'https://i.pravatar.cc/150?u=14', chatsHandled: 235, neutralRatings: 16, negativeRatings: 9 },
  { id: 15, name: 'Miguel Angel', shift: Shift.NT1, satisfaction: 86, quality: 85, avatar: 'https://i.pravatar.cc/150?u=15', chatsHandled: 225, neutralRatings: 20, negativeRatings: 10 },

  { id: 16, name: 'Paula Navarro', shift: Shift.NT2, satisfaction: 96, quality: 99, avatar: 'https://i.pravatar.cc/150?u=16', chatsHandled: 310, neutralRatings: 2, negativeRatings: 1 },
  { id: 17, name: 'Roberto Diaz', shift: Shift.NT2, satisfaction: 95, quality: 92, avatar: 'https://i.pravatar.cc/150?u=17', chatsHandled: 290, neutralRatings: 5, negativeRatings: 3 },
  { id: 18, name: 'Claudia Gomez', shift: Shift.NT2, satisfaction: 90, quality: 94, avatar: 'https://i.pravatar.cc/150?u=18', chatsHandled: 265, neutralRatings: 10, negativeRatings: 4 },
  { id: 19, name: 'Fernando Marin', shift: Shift.NT2, satisfaction: 88, quality: 90, avatar: 'https://i.pravatar.cc/150?u=19', chatsHandled: 245, neutralRatings: 13, negativeRatings: 7 },
  { id: 20, name: 'Lucia Jimenez', shift: Shift.NT2, satisfaction: 84, quality: 89, avatar: 'https://i.pravatar.cc/150?u=20', chatsHandled: 230, neutralRatings: 19, negativeRatings: 11 },
];