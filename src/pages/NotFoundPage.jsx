import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#3f51b5",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}

//<Link to="/">Go Back Home</Link>
/*Özetle: Bu link tamamen client-side routing kullanır, 
normal <a href="/"> gibi sayfayı yeniden yüklemez.*/
export default NotFoundPage;
