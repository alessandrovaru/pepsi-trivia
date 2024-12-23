'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient();

  // Asegúrate de que formData sea una instancia válida del objeto FormData
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // Autenticación con Supabase
  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    // Redirige a una página de error si falla la autenticación
    redirect('/error');
  }

  // Revalida y redirige a la página principal después del login exitoso
  revalidatePath('/', 'layout');
  redirect('/winners');
}