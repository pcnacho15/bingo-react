import { useEffect, useState } from "react";

const initialNumbers = () => {
  // Generamos un tablero de 5x5 con números aleatorios
  const numbers = Array.from({ length: 65 }, (_, i) => i + 1);
  //   const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  //   return numbxers.sort(() => Math.random() - 0.5);
  return numbers;
};

const usedNumbers = new Set();

const getRandomNumber = () => {
  if (usedNumbers.size === 30) {
    window.alert(
      "Ya se generaron el total de las balotas, el juego ha finalizado"
    );
    // localStorage.removeItem("markedNumbers");
    // localStorage.removeItem("balotas");

    // window.location.reload()
    throw new Error("Todos los números del 1 al 65 ya han sido generados");
  }

  let randomNumber;
  do {
    randomNumber = Math.floor(Math.random() * 65) + 1; // Genera un número aleatorio entre 1 y 65
    // randomNumber = Math.floor(Math.random() * 25) + 1; //
  } while (usedNumbers.has(randomNumber)); // Repite si el número ya fue sorteado

  usedNumbers.add(randomNumber); // Añade el número al conjunto de números usados
  return randomNumber;
};

const getBalotasStorage = () => {
  const storedBalotas = localStorage.getItem("balotas");
  return storedBalotas ? JSON.parse(storedBalotas) : [];
};

export const TableBingo = () => {
  const [numbers, setNumbers] = useState(initialNumbers());
  const [balotas, setBalotas] = useState(getBalotasStorage());
  //   const [markedNumbers, setMarkedNumbers] = useState(() => {
  //     // Obtenemos los números marcados de localStorage
  //     const storedMarked = localStorage.getItem("markedNumbers");
  //     return storedMarked ? JSON.parse(storedMarked) : [];
  //   });

  useEffect(() => {
    // Guardamos los números marcados en localStorage cada vez que se actualicen
    // localStorage.setItem("markedNumbers", JSON.stringify(markedNumbers));
    localStorage.setItem("balotas", JSON.stringify(balotas));
  }, [balotas]);

  //   const handleClick = (number) => {
  //     if (markedNumbers.includes(number)) {
  //       setMarkedNumbers(markedNumbers.filter((n) => n !== number));
  //     } else {
  //       setMarkedNumbers([...markedNumbers, number]);
  //     }
  //   };

  const handdleRamdomNumber = () => {
    let number = getRandomNumber();

    setBalotas([...balotas, number]);
    window.alert(`EL número de la balota es el: ${number}`);
  };

  return (
    <div className="flex flex-col items-center">
      {/* <h1 className="text-3xl font-bold mb-4 text-indigo-600 uppercase">
          Bingo
        </h1> */}
      <button
        onClick={handdleRamdomNumber}
        className="bg-orange-400 hover:bg-orange-500 rounded p-2 uppercase text-xl font-bold px-5 text-white"
      >
        Generar Balota
      </button>
      <div className="flex text-white font-bold text-4xl m-5 gap-1 ">
        <span className="bg-orange-500 rounded w-10 text-center">B</span>
        <span className="bg-yellow-500 rounded w-10 text-center">I</span>
        <span className="bg-green-500 rounded w-10 text-center">N</span>
        <span className="bg-blue-500 rounded w-10 text-center">G</span>
        <span className="bg-purple-500 rounded w-10 text-center">O</span>
      </div>
      <div className="grid grid-cols-5 gap-4 bg-orange-300 p-5 rounded-lg border-4 border-orange-400">
        {numbers.map((number, index) => (
          <div
            key={index}
            // onClick={() => handleClick(number)}
            className={`w-8 h-6 flex items-center justify-center text-xl font-semibold rounded-md shadow-md ${
              balotas.includes(number)
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {number}
          </div>
        ))}
        {/* <button>Generar Balota</button> */}
      </div>
    </div>
  );
};
