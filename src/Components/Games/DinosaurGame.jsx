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

  // Obstacle properties
  const OBSTACLE_WIDTH = 20;
  const OBSTACLE_HEIGHT = 30;
  const OBSTACLE_SPEED = 5;

  //Physics constaints
  const JUMP_FORCE = -10;
  const GRAVITY = 0.6;
  const [velocity, setVelocity] = useState(0); // Dino Velocity

  // Jumping function
  const jump = () => {
    console.log("Jump function called!"); // Debugging purposes
    if (!isJumping && dinoPosition === 0) {
      setIsJumping(true);
      setVelocity(JUMP_FORCE);
    } else {
      console.log("Jump ignored: already jumping!"); // Debugging purposes
    }
  };

  // Loop to increment score
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Listen for keyboard press
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log("Key pressed:", event.code); // Debugging purposes
      if (event.code === "Space") {
        event.preventDefault(); // Prevents the default scrolling BTW
        if (!gameStarted && !gameOver) {
          console.log("Starting game"); // Debugging purposes
          setGameStarted(true);
          setObstacles([]);
          setScore(0);
          setGameOver(false);
          setDinoPosition(0);
          setVelocity(0);
        } else if (gameStarted && !gameOver) {
          jump();
        } else {
          console.log("Conditions for jump or starting game not met!"); // Debugging purposes
        }
      }

      if (event.key === "R" || event.key === "r") {
        if (gameOver) {
          console.log("Restarting game!");
          setGameStarted(false);
          setScore(0);
          setObstacles([]);
          setGameOver(false);
          setDinoPosition(0);
          setVelocity(0);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown); // Cleanup when component unmounts :)
  }, [gameStarted, gameOver, isJumping, dinoPosition]);

  // Physics loop for when jumping
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const updatePhysics = () => {
      setVelocity((currentVelocity) => {
        const newVelocity = currentVelocity + GRAVITY;

        setDinoPosition((currentPosition) => {
          const newPosition = currentPosition - newVelocity;

          if (newPosition <= 0) {
            setIsJumping(false);
            console.log("Dino landed!"); // Debugging purposes
            return 0;
          }
          return newPosition;
        });
        return newVelocity;
      });
    };

    const physicsInterval = setInterval(updatePhysics, 16);
    return () => clearInterval(physicsInterval); // Cleanup after jumping
  }, [gameOver, gameStarted]);

  // Setting up scene
  return (
    <div className="flex flex-col items-center pt-12 font-mono min-h-screen bg-[#0f172b] border-none">
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
          className="absolute bottom-0 w-full bg-[#0f172b]"
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

        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-white text-xl">
            <div>Game Over!</div>
            <div className="text-base mt-2.5">Final Score: {score}</div>
            <div className="text-sm mt-5">Press 'R' to restart</div>
          </div>
        )}

        {/* Start Screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-white/90 flex flex-col justify-center items-center text-lg">
            <div>🦕 Chrome Dino Game</div>
            <div className="text-sm mt-5">Press SPACE to start</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DinoGame;
