import { useState, useEffect } from "react";
import { TableBingo } from "./components/TableBingo";
import { TopMenu } from "./components/TopMenu";
// import { TopMenu } from "./components/TopMenu";

const initialNumbers = () => {
  // Generamos un tablero de 5x5 con números aleatorios
  const numbers = Array.from({ length: 65 }, (_, i) => i + 1);
  // const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
  return numbers.sort(() => Math.random() - 0.5).slice(0, 25);
};

export const App = () => {
  const [numbers, setNumbers] = useState(initialNumbers());
  const [markedNumbers, setMarkedNumbers] = useState(() => {
    // Obtenemos los números marcados de localStorage
    const storedMarked = localStorage.getItem("markedNumbers");
    return storedMarked ? JSON.parse(storedMarked) : [];
  });

  useEffect(() => {
    // Guardamos los números marcados en localStorage cada vez que se actualicen
    localStorage.setItem("markedNumbers", JSON.stringify(markedNumbers));
  }, [markedNumbers]);

  const handleClick = (number) => {
    if (markedNumbers.includes(number)) {
      setMarkedNumbers(markedNumbers.filter((n) => n !== number));
    } else {
      setMarkedNumbers([...markedNumbers, number]);
    }
  };

  const handleBingo = () => {
    const balotaStorage = JSON.parse(localStorage.getItem("balotas") || []);
    let bingo = true;

    for (let index = 0; index < markedNumbers.length; index++) {
      if (!balotaStorage.includes(markedNumbers[index])) {
        bingo = false;
        break;
      }
    }

    if (markedNumbers.length < 25) {
      bingo = false;
    }

    if (bingo) {
      window.alert("FELICIDADES, HAS GANADO... BINGO!!");
    } else {
      window.alert(
        "LO SENTIMOS, HAS PERDIDO, NO HAS COMPLETADO EL TOTAL DE LAS BALOTAS"
      );
    }

    setTimeout(() => {
      setMarkedNumbers([]);
      localStorage.removeItem("markedNumbers");
      localStorage.removeItem("balotas");
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      {/* <TopMenu /> */}
      <TopMenu />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 gap-64">
        <div>
          {/* <button
        onClick={resetGame}
        className="ml-5 mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-700"
      >
        Reset Game
      </button> */}
          <div className="flex flex-col items-center bg-orange-300 p-10 rounded-lg border-4 border-orange-400">
            <h1 className="text-3xl text-ellipsis uppercase font-bold mb-4 text-white">
              cartón
            </h1>
            <div className="grid grid-cols-5 gap-4">
              {numbers.map((number, index) => (
                <div
                  key={index}
                  onClick={() => handleClick(number)}
                  className={`w-16 h-16 flex items-center justify-center cursor-pointer text-xl font-semibold rounded-md shadow-md ${
                    markedNumbers.includes(number)
                      ? "bg-green-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {number}
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full m-auto gap-2 mt-5">
              <button
                onClick={handleBingo}
                className="mt-6 px-4 uppercase text-2xl py-2 bg-lime-500 text-white font-semibold rounded-md shadow-md hover:bg-lime-700"
              >
                ¡Bingo!
              </button>
            </div>
          </div>
        </div>
        <TableBingo />
      </div>
    </>
  );
};
