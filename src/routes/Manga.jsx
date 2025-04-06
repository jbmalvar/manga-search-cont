import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Manga.css'

export const Manga = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const manga = location.state?.manga;
  console.log(manga +"hey");

  if (!manga) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  return (
    <div className="MangaContainer">
      <h1>{manga.title}</h1>
      <div className="extraInfo">
        <p>Type: {manga.type}</p>
        <p>Chapters: {manga.chapters}</p>
        <p>Status: {manga.status}</p>
        <p>Score: {manga.score}</p>
        <p>Genres: {manga.genres.map((genre) => genre.name).join(', ')}</p>
        <p>Published: {manga.published?.string}</p>
      </div>
      <img src={manga.images?.jpg?.large_image_url} alt={manga.title} className="MangaImage" />
      <p>{manga.synopsis}</p>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
};

export default Manga;