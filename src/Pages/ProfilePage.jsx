import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updateProfile, updatePassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth"; // Optional: if using this library
import logo_icon from "../assets/logo.png";

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth); // If using react-firebase-hooks
  // Alternative: const user = auth.currentUser; // If not using the library
  
  const [userStats, setUserStats] = useState({
    draws: 0,
    loss: 0,
    wins: 0
  });
  
  const [profileData, setProfileData] = useState({
    displayName: "",
    email: "",
    createdAt: null
  });
  
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    displayName: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserStats(userData.stats || { draws: 0, loss: 0, wins: 0 });
            setProfileData({
              displayName: userData.displayName || user.displayName || "",
              email: userData.email || user.email || "",
              createdAt: userData.createdAt
            });
            setEditData({
              displayName: userData.displayName || user.displayName || "",
              newPassword: "",
              confirmPassword: ""
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUpdateError("Failed to load profile data");
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateError("");
    setSuccessMessage("");

    try {
      // Update display name if changed
      if (editData.displayName !== profileData.displayName) {
        // Update Firebase Auth profile
        await updateProfile(user, {
          displayName: editData.displayName
        });

        // Update Firestore document
        const userDocRef = doc(db, "users", user.uid);
        await updateDoc(userDocRef, {
          displayName: editData.displayName
        });

        setProfileData(prev => ({
          ...prev,
          displayName: editData.displayName
        }));
      }

      // Update password if provided
      if (editData.newPassword) {
        if (editData.newPassword !== editData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        if (editData.newPassword.length < 6) {
          throw new Error("Password must be at least 6 characters long");
        }
        
        await updatePassword(user, editData.newPassword);
        setEditData(prev => ({
          ...prev,
          newPassword: "",
          confirmPassword: ""
        }));
      }

      setSuccessMessage("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      setUpdateError(error.message);
      console.error("Profile update error:", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  // Calculate win rate
  const totalGames = userStats.wins + userStats.loss + userStats.draws;
  const winRate = totalGames > 0 ? ((userStats.wins / totalGames) * 100).toFixed(1) : 0;

  // Format date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    return timestamp.toDate ? timestamp.toDate().toLocaleDateString() : "Unknown";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-white text-lg">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-slate-400 mb-6">Please log in to view your profile</p>
          <a
            href="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img
              src={logo_icon}
              alt="Logo Icon"
              className="w-16 h-16 object-contain mr-3"
            />
            <h1 className="text-3xl font-bold text-white">
              Your <span className="text-blue-400">Profile</span>
            </h1>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-6 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400 text-center">{successMessage}</p>
          </div>
        )}
        
        {updateError && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-center">{updateError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {editMode ? (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={editData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    New Password (leave blank to keep current)
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={editData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>

                {editData.newPassword && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={editData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors duration-200"
                  >
                    {updateLoading ? "Updating..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setEditData({
                        displayName: profileData.displayName,
                        newPassword: "",
                        confirmPassword: ""
                      });
                      setUpdateError("");
                    }}
                    className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Display Name
                  </label>
                  <p className="text-white text-lg">{profileData.displayName || "Not set"}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Email Address
                  </label>
                  <p className="text-white text-lg">{profileData.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Member Since
                  </label>
                  <p className="text-white text-lg">{formatDate(profileData.createdAt)}</p>
                </div>
              </div>
            )}
          </div>

          {/* Game Statistics */}
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Game Statistics</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-400">{userStats.wins}</div>
                <div className="text-slate-300 text-sm">Wins</div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-400">{userStats.loss}</div>
                <div className="text-slate-300 text-sm">Losses</div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-400">{userStats.draws}</div>
                <div className="text-slate-300 text-sm">Draws</div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">{totalGames}</div>
                <div className="text-slate-300 text-sm">Total Games</div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Win Rate</span>
                <span className="text-white font-semibold">{winRate}%</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${winRate}%` }}
                ></div>
              </div>
            </div>

            {totalGames === 0 && (
              <div className="text-center mt-6 p-6 border-2 border-dashed border-slate-600 rounded-lg">
                <p className="text-slate-400 text-lg mb-2">🎮</p>
                <p className="text-slate-400">No games played yet!</p>
                <p className="text-slate-500 text-sm">Start playing to see your statistics</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;