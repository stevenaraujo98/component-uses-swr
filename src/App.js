import React from 'react';
import './App.css';
import useSWR from 'swr';

function fetcher(url) {
  return fetch(url).then( res => res.json());
}

function Pokemon({name}){
  //swr va a buscar en cache si es algo que ya se habia cargado y mientras
  //devuelve lo que hay en cache en caso de haber consulta al api nuevamente
  //para verificar exitiera actualización.
  const { data } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${name}`, 
    fetcher,
    { suspense: true } //esto en caso de usar suspende solamente
  );

  if(!data) return <p>Loading...</p>
  
  return <div>
    <h3>{data.name}</h3>
    <img src={data.sprites.front_default} alt="Imagen del pokemon :("/>
  </div>
}

function App() {
  const [ name, setName ] = React.useState("pikachu");
  const [ realName, setRealName ] = React.useState("pikachu");

  function handleSubmit(e){
    e.preventDefault();
    setRealName(name);
  }

  return (
    <div className="App">
      <h1>Peticion al Pokiapi</h1>
      
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={ e => setName(e.target.value)}/>
        <br/>
        <button type="submit">Search</button>
      </form>

      <React.Suspense fallback={<p>Loading {realName}</p>}>{/* Por el suspense: true */}
        <Pokemon name={realName}/>
      </React.Suspense>

    </div>
  );
}

export default App;
