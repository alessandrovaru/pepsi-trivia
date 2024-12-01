'use client'
import { useState } from 'react';


export default function TableWithFilter({ data, error, getUser }) {
  const [selectedAnswers1, setSelectedAnswers1] = useState([]);
  const [selectedAnswers2, setSelectedAnswers2] = useState([]);
  const [winner, setWinner] = useState(null);

  const options = [
    'José Altuve', 'Eugenio Suárez', 'William Contreras', 'Renato Nuñez',
    'Andrés Chaparro', 'Jackson Chourio', 'Luisangel Acuña', 'Anthony Santander'
  ];

  // Asignar un valor numérico a cada opción
  const optionsWithValues = options.map((option, index) => ({
    label: option,
    value: index.toString()
  }));

  // Manejar cambios en los checkboxes de la Pregunta 1
  const handleCheckboxChange1 = (value) => {
    setSelectedAnswers1((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Manejar cambios en los checkboxes de la Pregunta 2
  const handleCheckboxChange2 = (value) => {
    setSelectedAnswers2((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Generar las cadenas de filtro separadas por '-'
  const answer1Filter = selectedAnswers1.join('-');
  const answer2Filter = selectedAnswers2.join('-');



  const filteredData = data.filter(userAnswer => {
    const matchesAnswer1 = 
    selectedAnswers1.length > 0 
      ? answer1Filter === userAnswer.answers && userAnswer.question_id === 1
      : true;
    const matchesAnswer2 = selectedAnswers2.length > 0 
      ? answer2Filter === userAnswer.answers && userAnswer.question_id === 2
      : true;
    return matchesAnswer1 || matchesAnswer2;
  });

  // Asegurar que al menos dos entradas con el mismo user_id sean mostradas
  const userIdCount = {};
  filteredData.forEach(userAnswer => {
    userIdCount[userAnswer.user_id] = (userIdCount[userAnswer.user_id] || 0) + 1;
  });


  const displayedData = filteredData.filter(userAnswer => userIdCount[userAnswer.user_id] >= 2);


  const generateRandomWinner = () => {
    const winner = displayedData[Math.floor(Math.random() * displayedData.length)];

    getUser(winner.user_id).then(({ data, error }) => {
      if (error) {
        console.error(error);
        return;
      }
      setWinner(data[0]);
    });
    
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen container mx-auto p-4 bg-black">
      <div className="mb-4 font-[family-name:var(--font-pepsi-owners-2-compressed)] text-white" >
        <div className="mb-4">
          <span className="block mb-2 font-semibold text-[3rem]">¿Quién llegó a la final?</span>
          <span className="block mb-2 font-semibold text-sm underline">Tienes que elegir dos finalistas</span>
          <div className="flex flex-wrap flex-col">
            {optionsWithValues.map(option => (
              
                <label key={`q1-${option.value}`} className="mr-4 flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedAnswers1.includes(option.value)}
                    onChange={() => handleCheckboxChange1(option.value)}
                    className="mr-1"
                  />
                  {option.label}
                </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <span className="block mb-2 font-semibold text-[3rem]">¿Quién ganó?</span>
          <span className="block mb-2 font-semibold text-sm underline">Tienes que elegir un solo ganador</span>
          <div className="flex flex-wrap flex-col">
            {optionsWithValues.map(option => (
              <label key={`q2-${option.value}`} className="mr-4 flex items-center">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedAnswers2.includes(option.value)}
                  onChange={() => handleCheckboxChange2(option.value)}
                  className="mr-1"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>
      
      {/* <table className="bg-white text-black border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200">Usuario ID</th>
            <th className="py-2 px-4 border-b border-gray-200">Respuestas</th>
            <th className="py-2 px-4 border-b border-gray-200">Id de pregunta</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? (
            displayedData.map((userAnswer) => (
              <tr key={userAnswer.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border-gray-200">{userAnswer.user_id}</td>
                <td className="py-2 px-4 border-b border-gray-200">{userAnswer.answers}</td>
                <td className="py-2 px-4 border-b border-gray-200">{userAnswer.question_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border-b border-gray-200 text-center" colSpan="3">No hay datos que mostrar</td>
            </tr>
          )}
        </tbody>
      </table> */}

      {/* add a text where it says how many entries we have, dont count the ones that have the same userid */}
      <div className="text-white mt-4 font-[family-name:var(--font-pepsi-owners-2-compressed)]">
        <p>{displayedData.length/2} entradas</p>
      </div>
      {winner && (
        <div className="text-white mt-4 font-[family-name:var(--font-pepsi-owners-2-compressed)]">
          <p>El ganador es: {winner.name} {winner.last_name}</p>
          <p>Con el correo: {winner.email}</p>
          <p> con  el número: {winner.phone_number}</p>
        </div>
      )}
      <button onClick={() => generateRandomWinner()} className="font-[family-name:var(--font-pepsi-owners-2-compressed)] mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900">Generar ganador</button>
          </div>
        );
}
