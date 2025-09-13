import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
// Pages
const HomePage=lazy(()=> import("./pages/HomePage.jsx"));
const MoviesPage=lazy(()=> import("./pages/MoviesPage.jsx"));
const MovieDetailsPage=lazy(()=> import ("./pages/MovieDetailsPage.jsx"));
const NotFoundPage=lazy(()=> import("./pages/NotFoundPage.jsx"));
// Components
import MovieCast from "./components/MovieCast.jsx";
import MovieReviews from "./components/MovieReviews.jsx";
import Navigation from "./components/Navigation.jsx";




function App() {
    return (
        <>
            <Navigation />
                 <Suspense
                fallback={<div>
                    <div className="spinner"></div>
                    <p>Loading...</p></div>}>
                 <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} >
           <Route path="cast" element={<MovieCast />} />
           <Route path="reviews" element={<MovieReviews />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
                </Suspense>
         </> 

  )
}


/* path= hangi url yolunu dinlediğini söyler.
   elements= path çalıştığında hangi bileşen render edilecek onu söyler.
   render etmek=Bir bileşeni (component) ekranda görünür hâle getirmek, tarayıcıya HTML olarak “basmak” demektir.
   
   Lazy → sayfayı gerektiğinde yükle
   Suspense → yüklenene kadar fallback göster
   Sonuç → uygulama hızlı ve modern olur ✅
   Normal fromlu import sayfa açılıe açılmaz yüklenir  lazy li import gerektiğinde yükler sayfayu
   ✅Pages (HomePage, MoviesPage, MovieDetailsPage, NotFoundPage) → büyük dosyalar olabilir, kullanıcı her zaman hepsini görmez. Lazy yüklenmesi mantıklı ✅
   ✅Components (Navigation, MovieCast, MovieReviews) → küçük parçalar, her yerde kullanılıyor olabilir. Onları lazy yapmak gerekmez.*/
export default App;