import React from 'react'
import{Link} from "react-router-dom"

const MovieList = ({ gelenfilmler}) => {
  return (
      <div >
          <ul >
            {gelenfilmler.map((film)=>(  //gelenfilmler state’ini props olarak alıyoruz ve map ile listeyi dönüyoruz.   
                <li key={film.id} style={{ display:"block" , textAlign: "left"}}>
                    <Link to={`/movies/${film.id}`}>
                           {film.title}
                    </Link>
                </li>
            ))}
          </ul>
    </div>
  )
}

// a href yerine link to kullanıyoruz çünkü sayfa yenilenmesini istemiyoruz. SPA mantığıyla çalışıyoruz.
// Link to içindeki /filmler/${film.id} dinamik olarak her filmin detay sayfasına yönlendirecek.
export default MovieList;