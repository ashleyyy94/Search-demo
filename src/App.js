import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [results, setResults] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestion] = useState([]);

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`)
      .then(res => {
        //console.log(res.data);
        var nameArray = [];
        for(let i = 0; i< res.data.length ; i++){
          nameArray.push(res.data[i].name.official)
        }
        setResults(nameArray);
      })
  }, []);

  const filterData = (e) =>{
    setQuery(e.target.value);
    const filtered = results.filter(item => {
      if(e.target.value === "") {
        return results
      }
      return(item.toLowerCase().includes(e.target.value.toLowerCase()))
    })
    setSuggestion(filtered);
    const options = []
    for(let i = 0; i< filtered.length ; i++){
      options.push(filtered[i])
    }
  }

  return (
    <div className="App">
      <input list="countries" type="text" id="search" value={query} placeholder="Search" onChange={filterData}/>
      <datalist id="countries">
        {suggestions.map(option => (
          <option value={option}></option>
          )
        )}
      </datalist>
      
    </div>
  );
}

export default App;
