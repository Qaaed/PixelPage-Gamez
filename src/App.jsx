import TicTacToe from "./Components/Games/TicTacToe";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Leaderboard from "./Components/Leaderboard";
import GameSelect from "./Components/GameSelect";
import About from "./Components/About";
import SnakeGame from "./Components/Games/SnakeGame";
import Ludo from "./Components/Games/Ludo";
import DinosaurGame from "./Components/Games/DinosaurGame";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Default route shows Game Select */}
        <Route path="/" element={<GameSelect />} />
        <Route path="/gameselect" element={<GameSelect />} />
        {/* LeaderBoard Routing */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        {/* TicTacToe Game Routing */}
        <Route path="/tictactoe" element={<TicTacToe />} />
        {/*Snake Game Routing */}
        <Route path="/snakeGame" element={<SnakeGame />} />
        {/*Ludo Game Routing */}
        <Route path="/ludo" element={<Ludo />} />
        {/*Dinosaur Game Routing */}
        <Route path="/dinosaurGame" element={<DinosaurGame />} />
        {/* Login Routing */}
        <Route path="/login" element={<Login />} />
        {/* Sign up Routing */}
        <Route path="/signup" element={<SignUp />} />
        {/* About Routing*/}
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
