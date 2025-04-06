import { useEffect, useState } from 'react'
import './App.css'
import background from './assets/background.mp4'
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {Manga} from './routes/Manga.jsx';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  const navigate = useNavigate(); // Initialize useNavigate

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
    setSelectedManga(manga); // Optional: Keep this if needed elsewhere
    navigate(`/manga/${manga.mal_id}`, { state: { manga } }); // Ensure the manga object is passed here
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

  const graphData = {
    labels: (filteredResults.length > 0 ? filteredResults : mangaList).map(manga => manga.title),
    datasets: [
      {
        label: 'Scores',
        data: (filteredResults.length > 0 ? filteredResults : mangaList).map(manga => manga.score || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const graphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Manga Scores',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
    },
  };

  const statusCounts = {
    Finished: mangaList.filter((manga) => manga.status === 'Finished').length,
    Publishing: mangaList.filter((manga) => manga.status === 'Publishing').length,
    OnHiatus: mangaList.filter((manga) => manga.status === 'On Hiatus').length,
  };

  const statusGraphData = {
    labels: ['Finished', 'Publishing', 'On Hiatus'],
    datasets: [
      {
        label: 'Manga Status',
        data: [statusCounts.Finished, statusCounts.Publishing, statusCounts.OnHiatus],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'], // Colors for each status
        borderColor: ['#388e3c', '#1976d2', '#f57c00'],
        borderWidth: 1,
      },
    ],
  };

  const statusGraphOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Manga Status Distribution',
      },
    },
  };

  return (
    <Routes>
        <Route path="/" element={
    <>
        <video autoPlay loop muted className="background-video">
          <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      <div className="App">
        <div className = "mangaSearch">
          <h1>📖 Manga Search</h1>
          <div className="MangaContainers">
            <button className = "mangaBut">About</button>
            <button className = "mangaBut">Search</button>
          </div>
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
            <div className="graph-container" style={{ marginTop: '20px' }}>
              <h2>Manga Scores Graph</h2>
              <Bar data={graphData} options={graphOptions} />
            </div>
            <div className="graph-container" style={{ marginTop: '20px' }}>
              <h2>Manga Status Distribution</h2>
              <Bar data={statusGraphData} options={statusGraphOptions} />
            </div>
        </div>
      </div>
    </>
    }/>
    <Route path="/manga/:id" element={
        <>
        <div className = "AppManga">
          <div className = "mangaSearch">
            <h1>📖 Manga Search</h1>
            <div className="MangaContainers">
              <button className = "mangaBut">About</button>
              <button className = "mangaBut" onClick={() => navigate('/')}>Search</button>
            </div>
          </div>
            <Manga />
        </div>
        </>
      } />
  </Routes>
  )
}

export default App;