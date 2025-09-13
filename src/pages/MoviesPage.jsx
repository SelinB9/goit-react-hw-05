import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios from 'axios';
import MovieList from '../components/MovieList';

const MoviesPage = () => {

  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query=searchParams.get("query") ?? ""; //arama parametresini alıyoruz. Eğer yoksa boş string döner.
  
  const [inputValue, setInputValue] = useState(query);
  


  useEffect(() => {
    if (!query) return; //Eğer query boşsa API çağrısı yapmıyoruz.
    async function fetchMovies() {
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?query=${query}`,  //? URL’de query parametrelerinin başladığını gösterir, yani HTTP GET isteğinde “sorgu parametresi” demektir.
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        setMovies(response.data.results);
        console.log(response.data.results);//filmler burada
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, [query]); //query değiştiğinde useEffect tetiklenir.

   


  const handleSubmit = (e) => {
    e.preventDefault();                     //Mantık: Form submit olunca sayfa reload olmaz, sadece URL güncellenir.
    setSearchParams({ query: inputValue });
    setInputValue("");                   //Arama yapıldıktan sonra input temizlenir.
  }


  return (
    <div >
    <form onSubmit={handleSubmit}  >
  <input 
    type="text" 
    value={inputValue} 
    onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Search movies..."
            style={{ 
        width: "400px",       // form genişliğini 
      padding: "8px",
           
       
      }}
  />
  <button type="submit" >Search</button>
    </form>
   <MovieList gelenfilmler={movies} />
</div>
  )
}

  export default MoviesPage;