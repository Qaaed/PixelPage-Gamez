import React from "react";
import { useNavigate } from "react-router-dom";
function GameSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        🎮 Select a Mini Game
      </h1>

      {/* Game buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={() => navigate("/tictactoeMode")}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Tic Tac Toe
        </button>
        <button
          onClick={() => navigate("/MemoryGame")}
          className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
        >
          Memory Game
        </button>
        <button
          onClick={() => navigate("/ludo")}
          className="px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
        >
          Ludo
        </button>
        <button
          onClick={() => navigate("/dinosaurGame")}
          className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
        >
          Dinosaur Game
        </button>
      </div>
    </div>
  );
}
export default GameSelect;
