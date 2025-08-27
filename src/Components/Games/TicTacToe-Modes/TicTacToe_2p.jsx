import React, { useState, useRef } from "react";
import circle_icon from "../../../assets/circle.png";
import cross_icon from "../../../assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""]; //stores the tic tac toe user inputs

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  //making a reference for each box
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let boxarray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      data[num] = "x";
      setCount(++count);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      data[num] = "o";
      setCount(++count);
    }
    checkWin();
  };

  const checkWin = () => {
    // Rows
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    // Columns
    else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    // Diagonals
    else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
    // Draw check
    else if (!data.includes("")) {
      won("draw");
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `<img src="${cross_icon}" class="inline w-12 h-12 mx-3"> has won the game! 🎉`;
      titleRef.current.className =
        "text-4xl md:text-5xl font-bold text-green-400 mb-12 text-center animate-pulse leading-tight";
    } else if (winner === "o") {
      titleRef.current.innerHTML = `<img src="${circle_icon}" class="inline w-12 h-12 mx-3"> has won the game! 🎉`;
      titleRef.current.className =
        "text-4xl md:text-5xl font-bold text-green-400 mb-12 text-center animate-pulse leading-tight";
    } else {
      titleRef.current.innerHTML = `It's a Draw! 🤝`;
      titleRef.current.className =
        "text-4xl md:text-5xl font-bold text-yellow-400 mb-12 text-center animate-pulse leading-tight";
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""]; // reset the global array

    titleRef.current.innerHTML = `Tic Tac Toe Game Built Using <span class="text-blue-400">React</span>`;
    titleRef.current.className =
      "text-3xl font-bold text-white mb-8 text-center";

    boxarray.forEach((box) => {
      box.current.innerHTML = "";
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center leading-tight"
          ref={titleRef}
        >
          Tic Tac Toe Game Built Using{" "}
          <span className="text-blue-400">React</span>
        </h1>

        {/* Game Board Container */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl mb-8">
          {/* Game Grid */}
          <div className="grid grid-cols-3 gap-3 w-fit mx-auto">
            {/* Row 1 */}
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box1}
              onClick={(e) => toggle(e, 0)}
            ></div>
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box2}
              onClick={(e) => toggle(e, 1)}
            ></div>
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box3}
              onClick={(e) => toggle(e, 2)}
            ></div>

            {/* Row 2 */}
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box4}
              onClick={(e) => toggle(e, 3)}
            ></div>
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box5}
              onClick={(e) => toggle(e, 4)}
            ></div>
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box6}
              onClick={(e) => toggle(e, 5)}
            ></div>

            {/* Row 3 */}
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box7}
              onClick={(e) => toggle(e, 6)}
            ></div>
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box8}
              onClick={(e) => toggle(e, 7)}
            ></div>
            <div
              className="w-24 h-24 md:w-28 md:h-28 bg-slate-700 border-2 border-slate-600 hover:border-blue-400 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-slate-600 hover:shadow-lg hover:scale-105 active:scale-95"
              ref={box9}
              onClick={(e) => toggle(e, 8)}
            ></div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          className="w-full max-w-xs mx-auto block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105 active:scale-95"
          onClick={reset}
        >
          🎮 Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
