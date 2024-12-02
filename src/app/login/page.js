'use client'
import { useState } from 'react';
import Image from 'next/image';
import { signup } from './actions';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [firstAnswers, setFirstAnswers] = useState({});
  const [firstAnswersString, setFirstAnswersString] = useState('');
  const [secondAnswersString, setSecondAnswersString] = useState('');
  const [secondOptions, setSecondOptions] = useState({});
  const [secondAnswers, setSecondAnswers] = useState({});
  const [warning, setWarning] = useState('');
  const [loading, setLoading] = useState(false);


  const router = useRouter();



  const questions = [
    {
      id: 1,
      question: '¿Cuáles son los dos peloteros que llegan a la final?',
      options: ['José Altuve', 'Eugenio Suárez', 'William contreras', 'Renato Nuñez', 'Andrés Chaparro', 'Jackson Chourio', 'Luisangel Acuña', 'Moisés Gómez'],
    },
    {
      id: 2,
      question: '¿Quién queda campeón? ',
      options: ['José Altuve', 'Eugenio Suárez', 'William contreras', 'Renato Nuñez', 'Andrés Chaparro', 'Jackson Chourio', 'Luisangel Acuña', 'Moisés Gómez'],
    }
  ];

  const handleNext = (e) => {
    e.preventDefault();
    const phoneRegex = /^(58|04|4)\d{9,11}$/; // Updated regex to match numbers starting with 58, 04, or 4
    if (step === 5 && !phoneRegex.test(phone)) {
      setWarning('El número de teléfono debe tener el formato. Ejemplo: 04121234567');
      return;
    }
    if (email) {
      setStep(step + 0.5);
      setTimeout(() => {
        setStep(step + 1);
      }, 100);
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   if (password) {
  //     login({ email, password });
  //   }
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !name || !lastname || !phone || !age || Object.keys(firstAnswers).length !== 2 || Object.keys(secondAnswers).length !== 1) {
      setWarning('Te faltan campos por llenar, por favor verifica');
      return;
    }

    setLoading(true);
  
    const signUpData = {
      email: email,
      password: Math.random().toString(36).slice(-8),
      name: name,
      lastname: lastname,
      phone: phone,
      age: age,
      first_answers: JSON.stringify(firstAnswers),
      second_answers: JSON.stringify(secondAnswers),
    };
  
    const response = await signup(signUpData);
    if (response.error) {
      
      setLoading(false);
      router.push("/quiniela-registered-ar");
      setWarning("Ya te registraste con estos datos. Pronto revelaremos a los ganadores"); 
      
    } else {
      setLoading(false);
      setWarning('');
    }
  };

  const handleFirstAnswersChange = (e) => {
    const { name, checked, value } = e.target;

    setFirstAnswers((prevAnswers) => {
      if (checked && Object.keys(prevAnswers).length < 2) {
        // Add the option to the state
        return {
          ...prevAnswers,
          [name]: value,
        };
      } else {
        // Remove the option from the state
        const updatedAnswers = { ...prevAnswers };
        delete updatedAnswers[name];
        return updatedAnswers;
      }
      
    });
    console.log(firstAnswers);
  };
  

  const handleSecondAnswersChange = (e) => {
    const { name, checked, value } = e.target;
  
    setSecondAnswers((prevAnswers) => {
      if (checked && Object.keys(prevAnswers).length < 1) {
        // Add the option to the state
        return {
          ...prevAnswers,
          [name]: value,
        };
      } else {
        // Remove the option from the state
        const updatedAnswers = { ...prevAnswers };
        delete updatedAnswers[name];
        return updatedAnswers;
      }
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNext(e);
    }
  };

  return (
    <div className="flex items-center justify-center h-[96vh]  p-8 font-[family-name:var(--font-pepsi-owners-2-compressed)] bg-black">
      <style jsx>{`
        @keyframes fadeIn {
          from {
          opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-100%);
          }
        }

        .step-1 {
          animation: ${step === 1 ? '' : 'fadeOut'} 0.5s forwards;
        }

        .step-2 {
          animation: ${step === 2 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        .step-3 {
          animation: ${step === 3 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        .step-4 {
          animation: ${step === 4 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        .step-5 {
          animation: ${step === 5 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        .step-6 {
          animation: ${step === 6 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        .step-7 {
          animation: ${step === 7 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        .step-8 {
          animation: ${step === 8 ? 'fadeIn' : 'fadeOut'} 0.5s forwards ;
        }

        main {
          position: relative;
          height: auto; /* Adjust based on content */
        }
      `}</style>
      {loading ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-70 flex items-center justify-center">
          <p className='text-white'>Cargando...</p>
        </div>
      ) : 
      <main className="w-full max-w-mdp-8 rounded-lg relative overflow-hidden bg-black grid grid-row-1 gap-6 p-8">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={200}
          height={200}
          className="mx-auto h-20 w-20"
        />
        <form className="flex flex-col gap-6 p-8 bg-black bg-opacity-50 rounded-lg">
        {warning && <div className="text-red-500">{warning}</div>}
          {/* Step 1: Email Add or condition*/}
          {(step === 1 || step === 1.5) && (
            <div className={`step step-1`}>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-white text-lg mb-1">
                  Correo Electrónico:
                </label>
                <p className="text-white text-sm mb-1">Ingresa un correo electrónico válido, te contáctaremos si ganas.</p>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {setEmail(e.target.value); setWarning('')}}
                  onKeyDown={handleKeyDown}
                  className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-row justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}


          {/* Step 2: Age */}
          {(step === 2 || step === 2.5) && (
            <div className={`step step-2`}>
              <div className="flex flex-col">
                <label htmlFor="age" className="text-white text-sm mb-1">
                  Edad:
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  value={age}
                  onChange={(e) => {setAge(e.target.value); setWarning('')}}
                  onKeyDown={handleKeyDown}
                  className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Pon tu edad"
                />
              </div>
              <div className="flex flex-row justify-between gap-4 pt-4">
                <button
                  type="button"
                  onClick={() =>{ setStep(step - 0.5); setTimeout(() => {setStep(step - 1);}, 100);}}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Siguiente
                </button>
                {/* <button
                  type="submit"
                  onClick={handleLogin}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Login
                </button> */}
              </div>
            </div>
          )}

          {(step === 3 || step === 3.5) && (
            <div className={`step step-3`}>
              <div className="flex flex-col">
                <label htmlFor="name" className="text-white text-lg mb-1">
                  Nombre:
                </label>
                <p className="text-white text-sm mb-1 underline">Ingresa solo tu nombre</p>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="flex flex-row justify-between gap-4 pt-4">
              <button
                  type="button"
                  onClick={() =>{ setStep(step - 0.5); setTimeout(() => {setStep(step - 1);}, 100);}}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {(step === 4 || step === 4.5) && (
            <div className={`step step-4`}>
              <div className="flex flex-col">
                <label htmlFor="lastname" className="text-white text-lg mb-1">
                  Apellido:
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  value={lastname}
                  onChange={(e) => {setLastname(e.target.value); setWarning('')}}
                  onKeyDown={handleKeyDown}
                  className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Agrega tu apellido" 
                />
              </div>
              
              <div className="flex flex-row justify-between gap-4 pt-4">
              <button
                  type="button"
                  onClick={() =>{ setStep(step - 0.5); setTimeout(() => {setStep(step - 1);}, 100);}}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                Siguiente
                </button>
              </div>
            </div>
          )}

          {(step === 5 || step === 5.5) && (
            <div className={`step step-5`}>
              <div className="flex flex-col">
                <label htmlFor="phone" className="text-white text-lg mb-1">
                  Número de teléfono:
                </label>
                <p className="text-white text-sm mb-1">Ingresa un número de teléfono válido, te contáctaremos si ganas.</p>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => {setPhone(e.target.value); setWarning('')}}
                  onKeyDown={handleKeyDown}
                  className="px-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-50 border border-transparent focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="04xxxxxxxxx"
                />
              </div>
             
              <div className="flex flex-row justify-between gap-4 pt-4">
              <button
                  type="button"
                  onClick={() =>{ setStep(step - 0.5); setTimeout(() => {setStep(step - 1);}, 100);}}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                Atrás
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                >
                Siguiente
                </button>
              </div>
            </div>
          )}

          {(step === 6  || step === 6.5) && (
            <div className={`step step-6`}>
              <div className="flex flex-col">
                <h2 className="text-white text-[1.5rem] mb-4 text-center">¡Haz tus predicciones!</h2>
                <div className="flex flex-row justify-between gap-4 pt-4">
                  <button
                      type="button"
                      onClick={() =>{ setStep(step - 0.5); setTimeout(() => {setStep(step - 1);}, 100);}}
                      className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                    >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                  >
                  Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}

          {(step === 7 || step === 7.5) && (
            <div className={`step step-7`}>
              <div className="flex flex-col">
                <div className="flex flex-col">
                  {/* Add checkboxes with different options */}
                  <h2 className="text-white text-[1.5rem] mb-4 ">{questions.find(q => q.id === 1).question}</h2>
                  <p className="text-white text-sm mb-3 underline">Selecciona los dos peloteros que crees que llegarán a la final</p>
                  {questions.find(q => q.id === 1).options.map((option, index) => (
                    <label key={index} className="text-white mb-2">
                      <input
                        type="checkbox"
                        name={`option-${index}`} // Unique name for each checkbox
                        value={option} // The value of the checkbox (e.g., the label text)
                        onChange={handleFirstAnswersChange} // Update state on change
                        onKeyDown={handleKeyDown}
                        className="mr-2"
                        checked={firstAnswers[`option-${index}`] || false} // Ensure it reflects the state (defaults to false if not checked)
                      />
                      {option} {/* Label text for the option */}
                    </label>
                  ))}
                  
                  

                  <div className="flex flex-row justify-between gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(step - 0.5);
                        setTimeout(() => { setStep(step - 1); }, 100);
                      }}
                      className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                    >
                    Atrás
                    </button>
                    {Object.keys(firstAnswers).length === 2 && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                      >
                      Siguiente
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          )}

          {(step === 8 || step === 8.5) && (
            <div className={`step step-8`}>
              <div className="flex flex-col">
                <div className="flex flex-col">
                      {/* add check boxes with different options */}
                      <h2 className="text-white text-[1.5rem] mb-4 ">{questions.find(q => q.id === 2).question}</h2>
                      {Object.entries(firstAnswers).map(([key, value]) => (

                           <label key={key} className="text-white mb-2">
                            <input
                              type="checkbox"
                              name={key} // Unique name for each checkbox
                              value={value} // The value of the checkbox (e.g., the label text)
                              onChange={handleSecondAnswersChange} // Update state on change
                              onKeyDown={handleKeyDown}
                              className="mr-2"
                              checked={secondAnswers[key] || false} // Ensure it reflects the state (defaults to false if not checked)
                            />
                            {value} {/* Label text for the option */}
                          </label>
                        ))}
                      
                      <div className="flex flex-row justify-between gap-4 pt-4">
                      <button
                          type="button"
                          onClick={() =>{ setStep(step - 0.5); setTimeout(() => {setStep(step - 1);}, 100); setSecondAnswers({});}}
                          className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                        >
                        Atrás
                      </button>
                        
                        {Object.keys(secondAnswers).length === 1 && (
                          <button
                            type="submit"
                            onClick={handleSignup}
                            className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                          >
                            Registrarse
                          </button>
                        )}
                      </div>
                    </div>
                    
              </div>
              
            </div>
          )}    
        </form>
      </main>
      }
    </div>
  );
}