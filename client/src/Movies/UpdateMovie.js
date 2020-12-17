import React,{useState,useEffect} from 'react';
import axios from 'axios'
import {useHistory,useParams} from 'react-router-dom'

const initialValues = {
    title: "",
    director: "",
    metascore: '',
    stars: []
}
export default function UpdateMovie (props){

    const [movie,setMovie] = useState(initialValues)
    const {id} = useParams();
    const history=useHistory()    

    const changeHandler=(e)=>{
      let value = e.target.value;
      if(e.target.name=='stars'){
          value = e.target.value.split(',')
      }
      setMovie({...movie,
        [e.target.name]:value
    })
    }

    useEffect(()=>{
       axios
       .get(`http://localhost:5000/api/movies/${id}`)
       .then(res=>{
           console.log(res)
           setMovie(res.data)
       })
       .catch(err=>{
           console.log(err)
       })
    },[])

    const submitHandler=(e)=>{

        e.preventDefault();

        axios
        .put(`http://localhost:5000/api/movies/${id}`,movie)
        .then(res=>{
            props.setMovieList(res.data)
            history.push(`/movies/${movie.id}`)
        })
        .catch(err=>{
            console.log(err.response)
        })

    }

    return(
        <div>
            <h2>Update the movie</h2>
            <form>
                <input 
                name="title"
                type="text"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
                />

                <input 
                name="director"
                type="text"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
                />

                <input 
                name="metascore"
                type="number"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
                />
                <input 
                name="stars"
                type="text"
                onChange={changeHandler}
                placeholder="stars"
                value={movie.stars}
                />
              
              <button onClick={submitHandler}>Submit</button>

            </form>
        </div>
    )
}