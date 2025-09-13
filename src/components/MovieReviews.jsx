import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/reviews`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        setReviews(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();//FONKSİYONU YUKARDA TANIMLADIK BURDADA ÇAĞIRIYORUZ
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id} style={{ marginBottom: "20px" }}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}

//fetchReviews() async fonksiyonu olmadan direkt then/catch ile de yapılıabilir MOVİECAST.jsx de öle yaptım.
export default MovieReviews;
