import { useEffect, useState } from 'react'
import './Manga.css'

function Manga() {
  return (
    <div className = "Manga">
        <div className = "mangaSearch">
            <h1>📖 Manga Search</h1>
            <div className="MangaContainer">
                <button className = "mangaBut">Search</button>
            </div>
            <div className = "mangaDetails">
                <img></img>
                <h1>Title: </h1>
                <h3>Description: </h3>
                <h3>Score: </h3>
                <h3>Genres: </h3>
                <h3>Episodes: </h3>
                <h3>Status: </h3>
                <p>Description: </p>
            </div>
        </div>
    </div>
  );
}

export default Manga;