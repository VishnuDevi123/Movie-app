import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { AuthModalProvider, useAuthModal } from "./contexts/AuthModalContext.jsx";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile.jsx";
import AuthPromptModal from "./components/AuthPromptModal";
import "./css/App.css";

// Separate wrapper to include the modal
function AppContent() {
  const { showAuthModal, setShowAuthModal } = useAuthModal();

  return (
    <>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* Global modal insted of displaying modal for each movie card */}
      {showAuthModal && <AuthPromptModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <AuthModalProvider>
          <AppContent />
        </AuthModalProvider>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;