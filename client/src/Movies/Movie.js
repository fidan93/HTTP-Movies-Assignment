import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import {useHistory} from 'react-router-dom'

function Movie({ addToSavedList,setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleUpdate=()=>{
    history.push(`/update-movie/${movie.id}`)
  }

  const deleteMovie=()=>{
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res=>{
      console.log(res.data)
      //history.push('/')
    })
    .catch(err=>{
     console.log(err)
    })
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <button onClick={handleUpdate}>Update</button>
      <button onClick={deleteMovie}>Delete</button>
    </div>
  );
}

export default Movie;
