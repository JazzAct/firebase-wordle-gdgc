import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "./firebase";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const leaderboardRef = collection(db, "leaderboard");
      const snapshot = await getDocs(leaderboardRef);
      const scoresList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort scores from highest to lowest
      scoresList.sort((a, b) => b.score - a.score);
      setScores(scoresList);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={entry.id}>
            {index + 1}. {entry.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
