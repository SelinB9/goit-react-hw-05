
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MovieCast() {

const {movieId}=useParams();
const [cast,setCast]=useState([]);

  useEffect(() => {
  fetch(`${BASE_URL}/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`, //API anahtarını yetkilendirme başlığına ekliyoruz.
    },
  })
      .then(response => response.json())
      .then(data => setCast(data.cast || [])) //data.cast varsa setCast e ata yoksa boş dizi ata
      .catch (error => console.error("Error fetching cast:", error));
      }, [movieId]);

  if (cast.length === 0) {
    return <div>No cast information available.</div>;
  }


return (
  <div>
    {cast.map(member => (
      <div key={member.cast_id} style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : 'https://via.placeholder.com/100x150?text=No+Image'}
          alt={member.name}
          style={{ width: "100px", height: "150px", objectFit: "cover", borderRadius: "8px" }}  //objectFit: "cover" resmin orantısını bozmadan kutuya sığdırır.
        />
        <p>{member.name}</p>
        <p>{member.character}</p>
      </div>
    ))}
  </div>
);
}

export default MovieCast;