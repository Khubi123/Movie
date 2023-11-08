import { useEffect, useState } from "react";
import "./App.css";
import SearchIcons from './search.svg';
import MovieCard from "./MovieCard";



const API_URL = "http://www.omdbapi.com?apikey=6b834f72";

const Movie1 = {
    "Title": "Miles Morales Ultimate Spiderman",
    "Year": "2021",
    "imdbID": "tt14311386",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNmMzODkwNDktMTkyMy00MmU5LWE4MGMtYzIzZjdjNmJiZDRiXkEyXkFqcGdeQXVyNDU1NDQ0NzE@._V1_SX300.jpg"
}


function App() {

  const [movies, setMovies] = useState([])
  const [searchTerm, setsearchTerm] = useState('')

  const searchMovies= async(title)=>{
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(()=>{
    searchMovies('Oppenheimer')
  }, [])


  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input placeholder="Search For Movies" value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)}/>
        <img src={SearchIcons} alt="Search" onClick={()=>searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length>0
        ?(
        <div className="container">
          {
            movies.map((movie)=>{
              return(
                <MovieCard key={movie.imdbID} movie={movie}/>
              )
            })
          }
        </div>
        ):
        (
          <div className="empty">
            <p style={{textAlign:'center'}}><strong>No Results Found!</strong></p>
          </div>
        )
      }


      </div>
  )
}

export default App;
