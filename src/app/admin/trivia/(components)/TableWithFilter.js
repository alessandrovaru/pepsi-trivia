'use client'
import { useState } from 'react';

export default function TableWithFilter({ data, error }) {
  const [selectedAnswers1, setSelectedAnswers1] = useState([]);
  const [selectedAnswers2, setSelectedAnswers2] = useState([]);

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

  // ORDENA SIEMPRE DE MENOR A MAYOR 
  const answer1FilterMayorAMenor = selectedAnswers1.sort((a, b) => a - b).join('-');
  const answer2FilterMayorAMenor = selectedAnswers2.sort((a, b) => a - b).join('-');

  const filteredData = data.filter(userAnswer => {
    const matchesAnswer1 = 
    selectedAnswers1.length > 0 
      ? answer1Filter === userAnswer.answers && userAnswer.question_id === 1
      : true;
    const matchesAnswer2 = selectedAnswers2.length > 0 
      ? answer2Filter === userAnswer.answers && userAnswer.question_id === 2
      : true;
    console.log(matchesAnswer1, matchesAnswer2);
    return matchesAnswer1 || matchesAnswer2;
  });

  // Asegurar que al menos dos entradas con el mismo user_id sean mostradas
  const userIdCount = {};
  filteredData.forEach(userAnswer => {
    userIdCount[userAnswer.user_id] = (userIdCount[userAnswer.user_id] || 0) + 1;
  });

  console.log( userIdCount)

  const displayedData = filteredData.filter(userAnswer => userIdCount[userAnswer.user_id] >= 2);

  console.log(JSON.stringify(displayedData));  

  return (
    <>
    {JSON.stringify(answer1Filter)}
    {JSON.stringify(answer2Filter)}
      <div className="mb-4">
        <div className="mb-4">
          <span className="block mb-2 font-semibold">Filtrar por Respuesta de Pregunta 1:</span>
          <div className="flex flex-wrap">
            {optionsWithValues.map(option => (
              <label key={`q1-${option.value}`} className="mr-4">
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
          <span className="block mb-2 font-semibold">Filtrar por Respuesta de Pregunta 2:</span>
          <div className="flex flex-wrap">
            {optionsWithValues.map(option => (
              <label key={`q2-${option.value}`} className="mr-4">
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
      <table className="min-w-full bg-white text-black">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Usuario ID</th>
            <th className="py-2 px-4 border-b">Respuestas</th>
            <th className="py-2 px-4 border-b">Id de pregunta</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.length > 0 ? (
            displayedData.map((userAnswer) => (
              <tr key={userAnswer.id}>
                <td className="py-2 px-4 border-b">{userAnswer.user_id}</td>
                <td className="py-2 px-4 border-b">{userAnswer.answers}</td>
                <td className="py-2 px-4 border-b">{userAnswer.question_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border-b text-center" colSpan="3">No hay datos que mostrar</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
