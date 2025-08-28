import React, { useState } from "react";
import TicTacToe_1p from "./TicTacToe_1p";
import TicTacToe_2p from "./TicTacToe_2p";

const GameMode = () => {
  const [mode, setMode] = useState(null);

  if (mode === "2p") {
    return <TicTacToe_2p />;
  } else if (mode === "1p") {
    return <TicTacToe_1p />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        Choose Game Mode
      </h1>
      <div className="space-y-6">
        <button
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 
          hover:from-blue-700 hover:to-blue-800 text-white text-lg 
          font-semibold rounded-xl transition-all duration-300 shadow-lg 
          hover:scale-105 active:scale-95 block w-60 mx-auto"
          onClick={() => setMode("1p")}
        >
          🎮 Play Against an AI Bot
        </button>
        <button
          className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 
          hover:from-green-700 hover:to-green-800 text-white text-lg 
          font-semibold rounded-xl transition-all duration-300 shadow-lg 
          hover:scale-105 active:scale-95 block w-60 mx-auto"
          onClick={() => setMode("2p")}
        >
          👥 Play Against Another Player
        </button>
      </div>
    </div>
  );
};

export default GameMode;
