import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Leaderboard from "./Components/Leaderboard";
import GameSelect from "./Components/GameSelect";
import About from "./Components/About";
import SnakeGame from "./Components/Games/MemoryGame";
import Ludo from "./Components/Games/Ludo";
import DinosaurGame from "./Components/Games/DinosaurGame";
import TicTacToeMode from "./Components/Games/TicTacToe-Modes/GameMode";
import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        {/* Default route shows Game Select */}
        <Route path="/" element={<GameSelect />} />
        <Route path="/gameselect" element={<GameSelect />} />

        {/* LeaderBoard Routing */}
        <Route path="/leaderboard" element={<Leaderboard />} />

        {/* TicTacToe Game Routing */}
        <Route path="/tictactoeMode" element={<TicTacToeMode />} />

        {/* Memory Game Routing */}
        <Route path="/memoryGame" element={<SnakeGame />} />

        {/* Ludo Game Routing */}
        <Route path="/ludo" element={<Ludo />} />

        {/* Dinosaur Game Routing */}
        <Route path="/dinosaurGame" element={<DinosaurGame />} />

        {/* Login Routing */}
        <Route path="/login" element={<Login />} />

        {/* Sign up Routing */}
        <Route path="/signup" element={<SignUp />} />

        {/* About Routing*/}
        <Route path="/about" element={<About />} />

        {/* Profile Routing */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
