const resetGame = () => {
  //   setNumbers(initialNumbers());
  //   setMarkedNumbers([]);
  localStorage.removeItem("markedNumbers");
  localStorage.removeItem("balotas");
  window.location.reload();
};

export const TopMenu = () => {
  return (
    <div className="flex justify-between w-full h-20 bg-gray-100 px-10">
      <button
        onClick={resetGame}
        className="bg-lime-600 hover:bg-lime-700 p-1 rounded mt-8 uppercase font-bold text-white text-base px-3"
      >
        Jugar de nuevo
      </button>
    </div>
  );
};
