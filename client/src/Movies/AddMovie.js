import React,{useState} from 'react';
import axios from 'axios'

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}
const AddMovie = (props) => {

    const [movie,setMovie] = useState(initialValues);

    const handleChange = (e) => {
     if(e.target.name === "stars"){
         setMovie({...movie,stars:e.target.value.split(",")})
     }
     else{
         setMovie({...movie,[e.target.name]:e.target.value})
     }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
     axios 
     .post("http://localhost:5000/api/movies",movie)
     .then(res => {
         console.log(res)
         props.setMovieList(res.data)
         props.history.push('/')
     })
     .catch(err => {
         console.log(err)
     })
    }

    return (
        <form onSubmit = {handleSubmit}>
        <input 
        type="text"
        name = "title"
        value = {movie.title}
        onChange = {handleChange}
        />

        <input 
        type="text"
        name = "director"
        value = {movie.director}
        onChange = {handleChange}
        />

        <input 
        type="text"
        name = "metascore"
        value = {movie.metascore}
        onChange = {handleChange}
        />

        <input 
        type="text"
        name = "stars"
        value = {movie.stars}
        onChange = {handleChange}
        />
        <button>Add Movie</button>
    </form>
    )
}

export default AddMovie;