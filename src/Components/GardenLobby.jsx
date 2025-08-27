import React, { useState, useEffect} from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebaseConfig';

const GardenLobby = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 400, y: 300 });
  const [coins, setCoins] = useState([]);
  const [collectedCoins, setCollectedCoins] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [playerDirection, setPlayerDirection] = useState('down');
  const [isMoving, setIsMoving] = useState(false);
  const [keys, setKeys] = useState({});
  
  const user = auth.currentUser;
  const playerName = user?.displayName || user?.email?.split('@')[0] || 'Player';

  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;
  const PLAYER_SIZE = 32;
  const COIN_SIZE = 24;
  const MOVE_SPEED = 3;

  // Generate random coins on component mount
  useEffect(() => {
    const generateCoins = () => {
      const newCoins = [];
      const coinCount = 15;
      
      for (let i = 0; i < coinCount; i++) {
        newCoins.push({
          id: i,
          x: Math.random() * (GAME_WIDTH - COIN_SIZE),
          y: Math.random() * (GAME_HEIGHT - COIN_SIZE),
          collected: false
        });
      }
      setCoins(newCoins);
    };
    
    generateCoins();
    
    // Load user's total coins from Firestore
    loadUserCoins();
  }, []);

  const loadUserCoins = async () => {
    if (user) {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setTotalCoins(userData.coins || 0);
        }
      } catch (error) {
        console.error('Error loading user coins:', error);
      }
    }
  };

  const updateUserCoins = async (newCoinCount) => {
    if (user) {
      try {
        await updateDoc(doc(db, 'users', user.uid), {
          coins: newCoinCount
        });
      } catch (error) {
        console.error('Error updating user coins:', error);
      }
    }
  };

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    };

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Player movement
  useEffect(() => {
    const movePlayer = () => {
      let newX = playerPosition.x;
      let newY = playerPosition.y;
      let moving = false;
      let direction = playerDirection;

      if (keys['w'] || keys['arrowup']) {
        newY = Math.max(0, newY - MOVE_SPEED);
        direction = 'up';
        moving = true;
      }
      if (keys['s'] || keys['arrowdown']) {
        newY = Math.min(GAME_HEIGHT - PLAYER_SIZE, newY + MOVE_SPEED);
        direction = 'down';
        moving = true;
      }
      if (keys['a'] || keys['arrowleft']) {
        newX = Math.max(0, newX - MOVE_SPEED);
        direction = 'left';
        moving = true;
      }
      if (keys['d'] || keys['arrowright']) {
        newX = Math.min(GAME_WIDTH - PLAYER_SIZE, newX + MOVE_SPEED);
        direction = 'right';
        moving = true;
      }

      if (moving) {
        setPlayerPosition({ x: newX, y: newY });
        setPlayerDirection(direction);
        setIsMoving(true);
      } else {
        setIsMoving(false);
      }
    };

    const gameLoop = setInterval(movePlayer, 16); // ~60 FPS
    return () => clearInterval(gameLoop);
  }, [keys, playerPosition, playerDirection]);

  // Collision detection for coins
  useEffect(() => {
    coins.forEach((coin, index) => {
      if (!coin.collected) {
        const distance = Math.sqrt(
          Math.pow(playerPosition.x + PLAYER_SIZE/2 - coin.x - COIN_SIZE/2, 2) +
          Math.pow(playerPosition.y + PLAYER_SIZE/2 - coin.y - COIN_SIZE/2, 2)
        );
        
        if (distance < (PLAYER_SIZE + COIN_SIZE) / 2) {
          // Coin collected!
          setCoins(prev => prev.map((c, i) => 
            i === index ? { ...c, collected: true } : c
          ));
          setCollectedCoins(prev => prev + 1);
          setTotalCoins(prev => {
            const newTotal = prev + 1;
            updateUserCoins(newTotal);
            return newTotal;
          });
        }
      }
    });
  }, [playerPosition, coins]);

  const resetGarden = () => {
    // Reset coins and player position
    setCoins(coins.map(coin => ({ ...coin, collected: false })));
    setCollectedCoins(0);
    setPlayerPosition({ x: 400, y: 300 });
  };

  const getPlayerSprite = () => {
    const baseColor = isMoving ? '#4ade80' : '#22c55e';
    return (
      <div
        className="absolute transition-all duration-75 ease-linear"
        style={{
          left: playerPosition.x,
          top: playerPosition.y,
          width: PLAYER_SIZE,
          height: PLAYER_SIZE,
        }}
      >
        {/* Player sprite */}
        <div
          className="relative rounded-full border-2 border-white shadow-lg"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            backgroundColor: baseColor,
          }}
        >
          {/* Face */}
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-white rounded"></div>
          
          {/* Direction indicator */}
          {playerDirection === 'up' && (
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-2 border-transparent border-b-white"></div>
          )}
          {playerDirection === 'down' && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white"></div>
          )}
          {playerDirection === 'left' && (
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-2 border-b-2 border-r-2 border-transparent border-r-white"></div>
          )}
          {playerDirection === 'right' && (
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-2 border-b-2 border-l-2 border-transparent border-l-white"></div>
          )}
        </div>
        
        {/* Player name */}
        <div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 text-white text-xs px-2 py-1 rounded-full border border-slate-600 whitespace-nowrap font-medium"
        >
          {playerName}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-400 via-green-500 to-green-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Game UI */}
        <div className="mb-4 flex justify-between items-center">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl px-6 py-3 border border-slate-600">
            <div className="flex items-center space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">🪙</span>
                <span className="font-semibold">Session: {collectedCoins}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400 text-xl">💰</span>
                <span className="font-semibold">Total: {totalCoins}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={resetGarden}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200 font-semibold"
          >
            Reset Garden
          </button>
        </div>

        {/* Game Area */}
        <div className="relative mx-auto border-4 border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
             style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
          
          {/* Garden Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-green-400">
            {/* Garden decorations */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-green-600 rounded-full opacity-30"></div>
            <div className="absolute top-20 right-20 w-12 h-12 bg-green-600 rounded-full opacity-30"></div>
            <div className="absolute bottom-20 left-20 w-20 h-20 bg-green-600 rounded-full opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-14 h-14 bg-green-600 rounded-full opacity-30"></div>
            
            {/* Grass pattern */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-6 bg-green-500 opacity-40 rounded-full"
                style={{
                  left: Math.random() * GAME_WIDTH,
                  top: Math.random() * GAME_HEIGHT,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              ></div>
            ))}
          </div>

          {/* Coins */}
          {coins.map((coin) => (
            !coin.collected && (
              <div
                key={coin.id}
                className="absolute animate-bounce"
                style={{
                  left: coin.x,
                  top: coin.y,
                  width: COIN_SIZE,
                  height: COIN_SIZE,
                }}
              >
                <div className="w-full h-full bg-yellow-400 rounded-full border-2 border-yellow-300 shadow-lg flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-xs">$</span>
                </div>
              </div>
            )
          ))}

          {/* Player */}
          {getPlayerSprite()}

          {/* Controls overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-800/70 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
            <div className="font-semibold mb-1">Controls:</div>
            <div>WASD or Arrow Keys to move</div>
            <div>Collect all coins! 🪙</div>
          </div>

          {/* Completion message */}
          {collectedCoins === coins.length && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-slate-800 rounded-2xl p-8 text-center border-2 border-yellow-400">
                <div className="text-4xl mb-4">🎉</div>
                <div className="text-white text-2xl font-bold mb-2">Garden Complete!</div>
                <div className="text-yellow-400 text-lg mb-4">You collected all {coins.length} coins!</div>
                <button
                  onClick={resetGarden}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Explore Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-4 text-white">
          <h3 className="font-bold text-lg mb-2">🌻 Welcome to the Garden Lobby!</h3>
          <p className="text-slate-300">
            Walk around as <span className="text-green-400 font-semibold">{playerName}</span> and collect coins to earn rewards! 
            Use WASD or arrow keys to move your character around the garden.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GardenLobby;