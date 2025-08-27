import React, { useState, useRef } from "react";
import circle_icon from "src/assets/circle.png";
import cross_icon from "src/assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const SinglePlayer = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);

  const boxRefs = Array.from({ length: 9 }, () => useRef(null));

  {
    /*TODO line 12 - 42 */
  }
  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    // Player move (always X)
    e.target.innerHTML = `<img src='${cross_icon}'>`;
    data[num] = "x";
    setCount((c) => c + 1);
    checkWin();

    // System move (O)
    setTimeout(systemMove, 500);
  };

  const systemMove = () => {
    if (lock) return;
    let emptySpots = data
      .map((val, i) => (val === "" ? i : null))
      .filter((i) => i !== null);
    if (emptySpots.length === 0) return;

    let randomIndex = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    data[randomIndex] = "o";
    boxRefs[randomIndex].current.innerHTML = `<img src='${circle_icon}'>`;
    setCount((c) => c + 1);
    checkWin();
  };

  const checkWin = () => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    for (let [a, b, c] of wins) {
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        won(data[a]);
        return;
      }
    }
    if (!data.includes("")) {
      won("draw");
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `You Win! 🎉`;
    } else if (winner === "o") {
      titleRef.current.innerHTML = `System Wins! 🤖`;
    } else {
      titleRef.current.innerHTML = `It's a Draw! 🤝`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe - Single Player Mode`;
    boxRefs.forEach((box) => (box.current.innerHTML = ""));
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <h1
        ref={titleRef}
        className="text-4xl font-bold text-white mb-12 text-center"
      >
        Tic Tac Toe - Single Player Mode
      </h1>
      <div className="grid grid-cols-3 gap-3">
        {boxRefs.map((ref, i) => (
          <div
            key={i}
            ref={ref}
            onClick={(e) => toggle(e, i)}
            className="w-24 h-24 bg-slate-700 border-2 border-slate-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-600"
          />
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Reset
      </button>
    </div>
  );
};

export default SinglePlayer;
