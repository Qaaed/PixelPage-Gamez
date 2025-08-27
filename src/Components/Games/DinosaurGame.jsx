import React, { useState, useEffect } from "react";
import dino from "../../assets/dino.svg";
import cactus from "../../assets/cactus.webp";

// Main game component
const DinoGame = () => {
  // Game variables
  const [isJumping, setIsJumping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [dinoPosition, setDinoPosition] = useState(0); // How high?
  const [obstacles, setObstacles] = useState([]); // Array of obstacles on screen

  // Game dimensions
  const GAME_WIDTH = 600;
  const GAME_HEIGHT = 200;
  const DINO_SIZE = 60;
  const GROUND_THICKNESS = 20;

  return (
    <div className="flex flex-col items-center pt-12 font-mono min-h-screen bg-gray-100">
      <h1>🦕 Chrome Dino Game</h1>
      <div className="text-lg mb-2.5">Score: {score}</div>

      <div
        className="relative bg-white mt-5 overflow-hidden border-2 border-gray-800"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
        }}
      >
        <div
          className="absolute bottom-0 w-full bg-gray-800"
          style={{
            height: GROUND_THICKNESS,
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 5px, #555 5px, #555 10px)",
          }}
        />

        <img
          src={dino}
          alt="Dino"
          className="absolute object-contain"
          style={{
            left: 50,
            bottom: GROUND_THICKNESS + dinoPosition,
            width: DINO_SIZE,
            height: DINO_SIZE,
          }}
        />

        {obstacles.map((obstacle) => (
          <img
            key={obstacle.id}
            src={cactusImage}
            alt="Cactus"
            style={{
              position: "absolute",
              left: obstacle.x,
              bottom: GROUND_HEIGHT,
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT,
              objectFit: "contain", // Keep the cactus proportions
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DinoGame;
