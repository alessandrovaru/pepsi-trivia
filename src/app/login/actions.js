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
  redirect('/');
}


export async function signup(signUpData) {
  const supabase = await createClient();
  console.log(signUpData);

  const { email, password, name, lastname, phone, first_answers, second_answers } = signUpData;

  // Sign up the user
  const { data: signUpResponse, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  
  


  // Insert additional user data into 'users' table
  const userData = {
    name: name,
    last_name: lastname,
    phone_number: phone,
    email: email,
    age: 24
  };

  const { data: userDataResponse, error: userDataError } = await addUserData(userData);

  const firstUserAnswers = {
    user_id: userDataResponse[0].id,
    question_id: 1, 
    answers: first_answers
  };

  const secondUserAnswers = {
    user_id: userDataResponse[0].id,
    question_id: 2, 
    answers: second_answers
  };

  console.log(firstUserAnswers);
  console.log(secondUserAnswers);

  await addUserAnswers(firstUserAnswers);
  await addUserAnswers(secondUserAnswers);



  console.log(userData);

  revalidatePath('/', 'layout');
  redirect('/trivia');
}

const addUserData = async (userData) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').insert([userData]).select();

  console.log(data[0]);
  

  if (error) {
    console.error(error);
  }

  return { data, error };
}

const addUserAnswers = async (answers) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('user_answers').insert([answers]).select();

  console.log(data);

  if (error) {
    console.error(error);
  }
}
