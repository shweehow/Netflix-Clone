import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })
  
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZDJlMmQ0YTVhOGU5NDdjZWE3OWE1MDM4NmFlZmEzYSIsIm5iZiI6MTc1NDk5NDQ4NC43Mjk5OTk4LCJzdWIiOiI2ODliMTczNGI2ZWRlZjExMzA4ZGIwODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MmwccygcKZzp_LJrzyK2VmGms72SLI2N7SlcACMINBI'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  },[])
  
  return (
    <div className='player'>
    <img src={back_arrow_icon} alt="" onClick={() => {Navigate(-2)}}/>
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameborder="0" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.name} ({apiData.type})</p>
        <p className='date'>{new Date(apiData.published_at).toLocaleDateString("en-Gb", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })}</p>
      </div>
    </div>
  )
}

export default Player
