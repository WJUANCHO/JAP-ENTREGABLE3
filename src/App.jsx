
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import LocationInfo from './utils/components/LocationInfo'
import ResidentInfo from './utils/components/ResidentInfo'
import getRandomLocation from './utils/getRandomLocation'

function App() {

  const [location, setlocation] = useState()
  const [numberLocation, setnumberLocation] = useState(getRandomLocation())
  const [HasError, setHasError] = useState(true)
 
  useEffect(() => {
    const url =`https://rickandmortyapi.com/api/location/${numberLocation}`
    axios.get(url)
    .then(res => {
      setlocation(res.data)
      setHasError(false)
    })
  
    .catch(err => {
      console.log(err)
      setHasError(true)
    })
    
  }, [numberLocation])
  const handleSubmit = e => {
    e.preventDefault()
    if(e.target.inputLocation.value.trim().length === 0){
       setnumberLocation(getRandomLocation())
    } else {
    setnumberLocation(e.target.inputLocation.value.trim())}
    
   e.target.inputLocation.value=e.target.inputLocation.value.trim()
  }

  return (
    <div className="App">
    <h1 className='app__title'>Rick and Morty</h1>
    <form className='form' onSubmit={handleSubmit}>
      <input className='form__input' id='inputLocation' type="text" />
      <button className='form__btn'>Search</button>
    </form>  
    {  
       HasError ?
           <h2 className='app__error'> ❌ Hey! you must provide an id from 1 to 126 😥</h2>
           :
         <>
          <LocationInfo location = {location}/>
          <div className='residents__container'> {
             location?.residents.map(url =>(
                <ResidentInfo
                   key={url}
                   url={url}
               />
            ))
          } 
        </div>
        </>
        }
  </div>
)
}

export default App
