import "../css/Recommend.css";
import { useAuth } from "../contexts/AuthContext";
import AuthPromptModal from "../components/AuthPromptModal";
import { useState, useEffect } from "react";
import { getRecommendations } from "../services/api";
import MovieCard from "../components/MovieCard";

function Recommend() {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowModal(true);
    } else {
      fetchRecommendations();
    }
  }, [user]);

  const fetchRecommendations = async () => {
    try {
      const data = await getRecommendations();
      console.log(" Recommendations from backend:", data); // TEST LOG
      setRecommendations(data);
    } catch (error) {
      console.error(" Failed to fetch recommendations:", error);
    }
  };

  if (!user) {
    return showModal ? (
      <AuthPromptModal onClose={() => setShowModal(false)} />
    ) : (
      <div className="recommend-empty">
        <h2>Recommendations are for logged-in users</h2>
        <p>Please login or register to view your personalized movie recommendations.</p>
      </div>
    );
  }

  return (
    <div className="recommend">
      <h2>Your Recommendations</h2>
      <div className="movies-grid">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        ) : (
          <p>No recommendations available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default Recommend;