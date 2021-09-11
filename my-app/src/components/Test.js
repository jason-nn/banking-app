import React, { useState, useEffect } from 'react'


const Test = () => {
  const [shibes, setShibes] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(res => res.json())
      .then(
        (data) => {
          setShibes(data.slice(0, 5));
          console.log(data.slice(0, 5));
        }
      )
      .catch(
        err => console.log('Error')
      )
  }, [])

  return (
    <div>
      {
        shibes &&
        shibes.map(shibe => { return <div key={shibe.id}><img src={shibe.url} /></div> })}
    </div>
  )
}

export default Test
