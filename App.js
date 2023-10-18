import React, { useEffect, useState } from 'react';
import MovieBox from './MovieBox'; // Composant qui sera utilisé pour afficher les films
import './App.css'; // Fichier de style 
import MySearchBar from './MySearchBar';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=917cc06f2e39f561da81f64319a6c702&language=fr-FR"; // URL de l'API utilisée pour récupérer les données des films populaires

function App() {

  const [movies, setMovies] = useState([]); // Création d'un state pour stocker les films récupérés

  useEffect(() => { // Hook useEffect pour exécuter du code au moment de l'affichage du composant
    fetch(API_URL) // Envoie d'une requête à l'API
      .then(res => res.json()) // Transformation de la réponse en objet JSON
      .then(data => {
        debugger; // Arrêt du code pour débugger (optionnel)
        setMovies(data.results) // Stockage des résultats dans le state 'movies'
      })
  }, []); // Le hook est exécuté une seule fois au moment de l'affichage du composant

  return (
    // Utilisation de la classe 'container' pour définir la structure de la page
    <div className='container' >
      {/* Utilisation de la classe 'grid' pour afficher les films en grille */}
      <MySearchBar />

      <div className='grid'>

        {movies.map((movieReq) => // Boucle pour afficher chaque film dans un composant 'MovieBox'
          <MovieBox key={movieReq.id} {...movieReq} />)}
      </div>
    </div>
  );
}






function SearchBarComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm === '') {
      setError("Oops, veuillez remplir l'input");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=917cc06f2e39f561da81f64319a6c702&language=fr-FR&query=${searchTerm}`);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Rechercher</button>
      </form>

      {error && <div className="error-msg">{error}</div>}

      {isLoading && <div className="loader">Loading...</div>}

      <div className="results-display">
        {movies.map((movie) => (
          <div key={movie.id} className="result-item">
            <h3 className="result-title">{movie.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="result-image"
            />
            <span className="result-overview">{movie.overview}</span>
          </div>
        ))}
      </div>
    </div>
  );
}




export default App; // Export du composant 'App' pour l'utiliser dans d'autres fichiers    