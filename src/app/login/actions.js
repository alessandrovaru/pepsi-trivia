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

  const { email, password, name, lastname, phone, first_answers, second_answers } = signUpData;

  // Convierte la cadena JSON en un objeto
  const firstAnswersObject = JSON.parse(first_answers);
  const secondAnswersObject = JSON.parse(second_answers);

  // Convierte el objeto en un array de claves
  const keysArray = Object.keys(firstAnswersObject);
  const keysArray2 = Object.keys(secondAnswersObject);

  // Extrae solo los números de las claves
  const numbersArray = keysArray.map(key => key.slice(7));
  const numbersArray2 = keysArray2.map(key => key.slice(7));

  //ordenalo de menor a mayor
  const numbersArraySorted = numbersArray.sort((a, b) => a - b);

  //ahora júntalos en una const que será un string que separe los números con un guión
  const numbersString = numbersArraySorted.join('-');
  const numbersString2 = numbersArray2.join('');


  // Sign up the user
  const { data: signUpResponse, error: signUpError } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (signUpError) {
    console.error(signUpError.message);
    return { error: signUpError.message };
  } else {
    
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
    answers: numbersString
  };

  const secondUserAnswers = {
    user_id: userDataResponse[0].id,
    question_id: 2, 
    answers: numbersString2
  };



  await addUserAnswers(firstUserAnswers);
  await addUserAnswers(secondUserAnswers);




  revalidatePath('/', 'layout');
  redirect('/trivia');

}
  


}

const addUserData = async (userData) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('users').insert([userData]).select();

  

  if (error) {
    console.error(error);
  }

  return { data, error };
}

const addUserAnswers = async (answers) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('user_answers').insert([answers]).select();


  if (error) {
    console.error(error);
  }
}
