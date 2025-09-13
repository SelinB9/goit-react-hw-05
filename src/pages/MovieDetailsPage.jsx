import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useParams, Link,NavLink} from "react-router-dom";
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location=useLocation();  //Kullanıcının şu anki URL bilgisini verir.Yani hangi sayfada olduğunu, query parametrelerini, state bilgilerini almanı sağlar.
  const [filmDetayi, setFilmDetayi] = useState(null);  
  const backLinkRef=useRef(location.state?.from ?? "/movies"); //eğer location.state.from varsa oraya git yoksa /movies a git

  
  useEffect(() => {
    fetch(`${BASE_URL}/movie/${movieId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFilmDetayi(data);
      })
    .catch ((error) => console.error("Error fetching movie details:", error));
  }, [movieId]);
  
  if (!filmDetayi) {
    return <div>Loading...</div>;
  }

  


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "10px" , maxWidth: "800px", margin: "0 auto"  }}>
      <Link to={backLinkRef.current}> 🔙Back to Movies </Link>
    
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      {/* Resim */}
        <img className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${filmDetayi.poster_path}`}
          alt={filmDetayi.title}
          style={{ width: "150px",height:"400px", borderRadius: "8px" }}
        />
      {/* Film detayları */}
        <div style={{ display: "flex", flexDirection: "column"}}>
        <h1>{filmDetayi.title}</h1>
        <p>User Score: {Math.round(filmDetayi.vote_average * 10)}%</p>
        <h2>Overview</h2>
        <p>{filmDetayi.overview}</p>
        <h3>Genres</h3>
        <p>{filmDetayi.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
        </div>

          {/* Additional Information artık buraya, resmin altında */}
          <div style={{borderTop: "1px solid gray", marginTop: "20px", paddingTop: "10px" }}>
          <h4>Additional Information</h4>
          <ul>
            <li>
             <NavLink to="cast">Cast</NavLink>
            </li>
            <li>
             <NavLink to="reviews">Reviews</NavLink>
            </li>
          </ul>
          </div>
      
      <Outlet />  {/* “buradan itibaren çocuk sayfaları getir” işareti gibi.cast ve reviews buraya render edilecek */}
      </div>
  );
}

export default MovieDetailsPage;
