import { useParams } from 'react-router-dom';

function MangaDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Manga Details</h1>
      <p>Details for Manga ID: {id}</p>
    </div>
  );
}

export default MangaDetails;
