import React,{useState,useEffect} from 'react';
import axios from 'axios';
import MovieList from './MovieList';

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
}
const UpdateMovie = (props) => {
   
const [movie,setMovie] = useState(initialValues);
const id = props.match.params.id;

const handleChange = (e) => {

if(e.target.name === "stars"){
   const arr = e.target.value.split(',');
   setMovie({...movie,stars:arr})
}
else{
    setMovie({...movie,[e.target.name]:e.target.value})
}
}

useEffect(()=>{
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        setMovie(res.data)
      
    })
    .catch(err => {
        console.log(err)
    })
    },[])

const handleSubmit = (e) => {
    e.preventDefault()
    axios
    .put(`http://localhost:5000/api/movies/${id}`,movie)
    .then(res =>{
        props.getMovieList()
        props.history.push(`/movies/${id}`)
    })
    .catch(err => {
        console.log(err)
    })

}




    return(
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
           <button>Update</button>
       </form>
    )
}

export default UpdateMovie;