'use client'
import { useState } from 'react';

export default function TriviaPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
    },
    {
      id: 3,
      question: 'What is the largest ocean on Earth?',
      options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    },
    // Add more questions as needed
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    setAnswers({ ...answers, [step]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answers);
    // Process answers here
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-[#fff] to-[#000000]">
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
          animation: ${step === 1 ? 'fadeIn' : 'fadeOut'} 0.5s forwards;
        }

        .step-2 {
          animation: ${step === 2 ? 'fadeIn' : 'fadeOut'} 0.5s forwards;
        }

        .step-3 {
          animation: ${step === 3 ? 'fadeIn' : 'fadeOut'} 0.5s forwards;
        }

        /* Add styles for additional steps */
      `}</style>
      <main className="w-full max-w-md p-8 rounded-lg relative overflow-hidden bg-black">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {questions.map((q) => (
            <div key={q.id} className={`step step-${q.id}`} style={{ display: step === q.id ? 'block' : 'none' }}>
              <div className="flex flex-col">
                <p className="text-white text-lg mb-4">{q.question}</p>
                {q.options.map((option, index) => (
                  <label key={index} className="text-white mb-2">
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                  >
                    Back
                  </button>
                )}
                {step < questions.length && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
                {step === questions.length && (
                  <button
                    type="submit"
                    className="bg-[#0025ff] bg-opacity-80 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition-colors"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          ))}
        </form>
      </main>
    </div>
  );
}