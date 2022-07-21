import React, { useEffect, useState } from "react"
import Card from "./Card"
import { FaAngleRight} from "react-icons/fa";


const Section = ({ genre }) => {
  const [movies, setMovies] = useState(null)
  const [pageState,setPageState] = useState(null)

    const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", { 
      method: "POST",
      body: JSON.stringify({genre:genre, pageState:pageState})
    })
    const responseBody = await response.json()

    setMovies(responseBody.data.movies_by_genre.values)
    setPageState(responseBody.data.movies_by_genre.pageState)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return( 
    <>
  <h2 id="genre">{ genre }</h2>
  {movies && (
    <div className="movie-section">
      {movies.map((movie, i )=>(
        <Card key={i} movie={movie}/>
      ))}
      <div className="more-button"
      onClick={()=>{
        setPageState(pageState)
        fetchData()
      }}
      >
        < FaAngleRight/>
      </div>
    </div>
  )}
  </>
  )
}

export default Section;
