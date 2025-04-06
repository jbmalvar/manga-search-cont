import { useEffect, useState } from 'react'
import './App.css'
import background from './assets/background.mp4'

function App() {
  const [mangaList, setMangaList] = useState([]);
  const [highestRated, setHighestRated] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [averageScore, setAverageScore] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [scoreFilter, setScoreFilter] = useState(0);
  const [selectedManga, setSelectedManga] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMangaData = async () => {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?page=${currentPage}`
      );
      const json = await response.json();
      setMangaList(json.data);
    };

    fetchMangaData().catch(console.error);
  }, [currentPage]);

  useEffect(() => {
    highestRatedManga();
    averageScoreManga();
    numberCompleted();
  }, [filteredResults, mangaList]);

  useEffect(() => {
    filterByScore();
  }, [sliderValue]);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = mangaList.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(mangaList);
    }
  }

  const selectStatus = (status) => {
    if (status !== "") {
      const filteredData = mangaList.filter((item) =>
        item.status.toLowerCase().includes(status.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(mangaList);
    }
  }

  const filterByScore = () => {
    let baseList = mangaList;
    if (searchInput) {
      baseList = baseList.filter((item) =>
        item.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    baseList = baseList.filter((item) => {
      const score = item.score || 0;
      return score >= sliderValue;
    });
  
    setFilteredResults(baseList);
  };
  const highestRatedManga = () => {
    const currentList = filteredResults.length > 0 ? filteredResults : mangaList;
    if (currentList.length > 0) {
      const highestRated = currentList.reduce((prev, current) => {
        return (prev.score > current.score) ? prev : current;
      });
      setHighestRated(highestRated);
    } else {
      setHighestRated(null);
    }
  };

  const numberCompleted = () => {
    const currentList = filteredResults.length > 0 ? filteredResults : mangaList;
    const completedCount = currentList.filter(manga => manga.status === 'Finished').length;
    return completedCount;
  }

  const averageScoreManga = () => {
    const currentList = filteredResults.length > 0 ? filteredResults : mangaList;
    if (currentList.length > 0) {
      const totalScore = currentList.reduce((acc, manga) => acc + (manga.score || 0), 0);
      const average = totalScore / currentList.length;
      setAverageScore(average.toFixed(2));
    } else {
      setAverageScore(0);
    }
  }

  const handleMangaClick = (manga) => {
    setSelectedManga({
      title: manga.title,
      image: manga.images?.jpg?.large_image_url || '',
      description: manga.synopsis || 'No description available.',
      url: manga.url || '#',
    });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      console.log("Next Page:", prevPage + 1);
      return prevPage + 1;
    });
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => {
        console.log("Previous Page:", prevPage - 1);
        return prevPage - 1;
      });
    }
  };

  return (
    <>
        <video autoPlay loop muted className="background-video">
          <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <div className="App">
        <div className = "mangaSearch">
          <h1>📖 Manga Search</h1>
          <div className="MangaContainer">
            <button className = "mangaBut">About</button>
            <button className = "mangaBut">Search</button>

          </div>
          <div className = "Manga"></div>
        </div>
        <div className = "MangaSearchContainer">
          <div className = "Categories">
            <h1>
              Mangas
              <span className = "buttons">
                <button className = "button" onClick={handlePrevPage} disabled={currentPage === 1}>Prev 25</button>
                <button className = "button" onClick={handleNextPage}>Next 25</button>
              </span>
            </h1>
            <div className = "CollectiveInfo">
              <div className="infoBox">Highest Rated: {highestRated ? highestRated.title : 'N/A'}</div>
              <div className="infoBox">Average Score: {averageScore}</div>
              <div className="infoBox">Number Completed: {numberCompleted()}</div>
            </div>
            <h2 className = "searchHeader">Search:
            <input 
              className="searchInput" 
              value={searchInput} 
              onChange={(e) => searchItems(e.target.value)} // Call searchItems directly
            />
              <select onChange={(e) => selectStatus(e.target.value)}> 
                <option value="">Select Status </option>
                <option value="Finished">Finished</option>
                <option value="Publishing">Publishing</option>
                <option value="On Hiatus">On Hiatus</option>
              </select>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span>Score: {sliderValue}</span>
                <input
                  type="range"
                  min="0"
                  max="9"
                  step="1"
                  value={sliderValue}
                  onChange={(e) => setSliderValue(e.target.value)}
                  style={{ display: 'block', margin: '10px auto' }}
                />
            </div>
            </h2>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="table">
              <thead>
                <tr class = "header">
                  <td class = "rankHeader">Rank</td>
                  <td class = "titleHeader">Title</td>
                  <td class = "scoreHeader">Score</td>
                  <td class = "authorHeader">Author</td>
                  <td class = "statusHeader">Status</td>
                </tr>
              </thead>
              <tbody>
              {(filteredResults.length > 0 ? filteredResults : mangaList).map(
                (manga) => (
                  <tr key={manga.mal_id}>
                    <td>{manga.rank}</td>
                    <td>
                    <button
                          onClick={() => handleMangaClick(manga)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                          }}
                        >
                          {manga.title}
                        </button>
                    </td>
                    <td>{manga.score || 'N/A'}</td>
                    <td>{manga.authors?.[0]?.name || 'Unknown'}</td>
                    <td>{manga.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;