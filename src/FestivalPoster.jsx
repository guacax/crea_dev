// FestivalPoster.jsx
import React, { useEffect, useRef, useState } from "react";
import "./FestivalPoster.css";

const artists = [
  "Justice", "Daft Punk", "Flume", "Tame Impala",
  "Bonobo", "Disclosure", "Kaytranada", "Aphex Twin",
  "Röyksopp", "Four Tet", "Caribou", "ODESZA"
];


const GRID_SIZE = 40; // largeur x hauteur
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;


export default function FestivalPoster() {
  const [bgDark, setBgDark] = useState(false);
  const [randomArtists, setRandomArtists] = useState([]);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const velocity = useRef({ x: 2, y: 2 });

  // Mise à jour de la liste des artistes toutes les 5s
 useEffect(() => {
  const interval = setInterval(() => {
    // Remplir la "grille" avec noms d’artistes OU vide
    const newGrid = Array.from({ length: TOTAL_CELLS }, () => {
      const shouldShow = Math.random() > 0.3; // 70% chance de montrer un nom
      return shouldShow
        ? artists[Math.floor(Math.random() * artists.length)]
        : ""; // Vide
    });

    setRandomArtists(newGrid);
    setBgDark(prev => !prev);
  }, 4000); // toutes les 4s

  return () => clearInterval(interval);
}, []);

  // Mouvement rebondissant du titre
  useEffect(() => {
    const move = () => {
      const logo = logoRef.current;
      const container = containerRef.current;
      if (!logo || !container) return;

      const logoRect = logo.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let newX = logo.offsetLeft + velocity.current.x;
      let newY = logo.offsetTop + velocity.current.y;

      if (newX + logoRect.width >= containerRect.width || newX <= 0)
        velocity.current.x *= -1;
      if (newY + logoRect.height >= containerRect.height || newY <= 0)
        velocity.current.y *= -1;

      logo.style.left = `${newX}px`;
      logo.style.top = `${newY}px`;

      requestAnimationFrame(move);
    };

    requestAnimationFrame(move);
  }, []);

  return (
    <div
      className={`poster-container ${bgDark ? "dark" : "light"}`}
      ref={containerRef}>
<div className="artist-background-grid">
  {randomArtists.map((artist, i) => (
    <span
      key={i}
      className={`grid-cell ${artist ? "visible" : "invisible"}`}
      style={{ "--i": i }}
    >
      {artist}
    </span>
  ))}
</div>


      <div className="festival-title" ref={logoRef}>
        WE LOVE GREEN 2026 
      </div>
    </div>
  );
}
