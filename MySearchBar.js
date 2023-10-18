import React, { useState } from 'react';

function MySearchBar() {
  const [query, setQuery] = useState(''); // State pour stocker la recherche de l'utilisateur
  const [results, setResults] = useState([]); // State pour stocker les résultats de la recherche

  const handleChange = event => {
    setQuery(event.target.value); // Mettre à jour la recherche à chaque changement dans l'input
  };

  const handleSubmit = event => {
    event.preventDefault(); // Empêcher la page de se recharger lors de la soumission du formulaire
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&language=fr-FR&query=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        setResults(data.results); // Mettre à jour les résultats de la recherche
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Rechercher</button>
      </form>
      {results.map(result => (
        <div key={result.id}>
          <h2>{result.title}</h2>
          <p>{result.overview}</p>
        </div>
      ))}
    </div>
  );
}

export default MySearchBar;
