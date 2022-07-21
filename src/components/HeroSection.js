import React, { useEffect, useState } from 'react'
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { IconContext } from "react-icons";




const HeroSection = () => {
    const [movie, setMovie] =useState(null)
    const [pageState, setPageState] = useState(null)


        const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMovies", { 
      method: "POST",
      body: JSON.stringify({genre:"Action", pageState:pageState})
    })
    const responseBody = await response.json()
    const movies = responseBody.data.movies_by_genre.values
    setMovie(movies[Math.floor(Math.random() * movies.length)])
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
        
        {movie && (
            <div className="hero">
                <video className="hero-video" muted controls autoPlay={true} loop>
                    <source src={movie.thumbnail} type="video/mp4"/>

                </video>
                <div className="info-section">
                    <h3 className="hero-blurb">{movie.synopsis}</h3>
                        <IconContext.Provider
                        value={{ margin: '5px', className:"icons" }}
                        >
                    <div className="button-section">
                        <div className="button play">
                            <span><BsFillPlayFill/></span>
                            Play
                        </div>
                        <div className="button more">
                             <span><AiFillInfoCircle/></span>
                            More Info
                        </div>
                    </div>
                    </IconContext.Provider>
                </div>
            </div>
        )}
    </div>
  )
}

export default HeroSection