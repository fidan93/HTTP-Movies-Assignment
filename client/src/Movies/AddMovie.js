import Axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios'

const initialValues = {
    title: "",
    director: "",
    metascore: '',
    stars: []
}


const AddMovie =(props)=>{

    const [movie,setMovie] = useState(initialValues);
   

    const changeHandle=(e)=>{
      console.log(e.target.value,e.target.name)
      let value=e.target.value;
      if(e.target.name==='stars'){
        value = e.target.value.split(',')
      }
      setMovie({...movie,[e.target.name]:value})
    }

    const addMovie=(e)=>{
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/movies',movie)
        .then(res=>{
            console.log(res)
            props.setMovieList(res.data)
            props.history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }
return(
    <div>
        <form>
        <input 
                name="title"
                type="text"
                onChange={changeHandle}
                placeholder="title"
                value={movie.title}
                />

                <input 
                name="director"
                type="text"
                onChange={changeHandle}
                placeholder="director"
                value={movie.director}
                />

                <input 
                name="metascore"
                type="number"
                onChange={changeHandle}
                placeholder="metascore"
                value={movie.metascore}
                />

               <input 
                name="stars"
                type="text"
                onChange={changeHandle}
                placeholder="stars"
                value={movie.stars}
                />

              <button onClick={addMovie}>Add Movie</button>
        </form>
    </div>
)
}

export default AddMovie;