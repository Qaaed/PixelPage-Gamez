import React from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-white mb-6">🏆 Leaderboard</h2>
      <div className="bg-slate-800 p-4 rounded-lg shadow-md w-full max-w-md">
        <table className="w-full text-center text-white">
          <thead>
            <tr className="bg-slate-700 text-blue-400">
              <th className="p-2">Rank</th>
              <th className="p-2">Player</th>
              <th className="p-2">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-700">
              <td className="p-2">1</td>
              <td className="p-2 text-green-400">AKASH</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2 ">2</td>
              <td className="p-2">SAFA SAIFUDEEN</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">4</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">5</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">6</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">7</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">8</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">9</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">10</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">11</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">12</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">13</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
            <tr className="hover:bg-slate-700">
              <td className="p-2">14</td>
              <td className="p-2">Ayyub Shaffy</td>
              <td className="p-2 text-red-400 font-semibold">5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
