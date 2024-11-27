'use server'

import { createClient } from '@/utils/supabase/server'

export async function getUserAnswers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_answers')
    .select('*');

  if (error) {
    return { error };
  }

  return { data };
}
