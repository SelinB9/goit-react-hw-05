import axios from "axios";
import { useState, useEffect } from "react";
import { Await } from "react-router-dom";
import MovieList from "../components/MovieList.jsx";


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL

function HomePage() {
  

  const [gelenFilmler, setgelenFilmler] = useState([]);


  useEffect(() => {
   async function fetchData() {  //API’den veri çeken asenkron bir fonksiyon oluşturuyoruz.
      try {
        const response = await axios.get(
          `${BASE_URL}/trending/movie/day`,
          {
            headers: {          //headers.Authorization → Bearer token ile API’ye erişimi sağlıyor.
              Authorization:`Bearer ${API_KEY}`,
            },
          }
        );
        setgelenFilmler(response.data.results);  //API’den gelen film listesini state’e kaydediyor.
        console.log(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();  // 💥 Fonksiyonu çağırıyoruz
  }, []);

/*VERİYİ BU KODLA(USEEFFECT) TMDB API DEN ALDIK GELENFİLMLER STATE İNE KAYDETTİK
HENÜZ EKRANA BASMADIK*/
  
  return (
    <div>
      <h1>Trending Today</h1>
      <MovieList gelenfilmler={gelenFilmler} />
    </div>
  )
}

export default HomePage;
