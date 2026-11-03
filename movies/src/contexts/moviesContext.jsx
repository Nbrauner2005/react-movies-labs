import React, { useState, useEffect } from "react";

// Creates a shared context for managing movie collections.
export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

  // Loads the saved Watchlist from localStorage when the app starts.
  const [mustWatch, setMustWatch] = useState(() => {
  const savedWatchlist = localStorage.getItem("mustWatch");
  return savedWatchlist ? JSON.parse(savedWatchlist) : [];
});

  const addToFavorites = (movie) => {
    let newFavorites = [];

    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }

    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(
      favorites.filter((mId) => mId !== movie.id)
    );
  };

  // Adds a movie to the Watchlist if it has not already been saved.
  const addToMustWatch = (movie) => {
    let newMustWatch = [];

    if (!mustWatch.includes(movie.id)) {
      newMustWatch = [...mustWatch, movie.id];
    } else {
      newMustWatch = [...mustWatch];
    }

    setMustWatch(newMustWatch);

  };

  // Removes the selected movie from the Watchlist using its ID.
  const removeFromMustWatch = (movie) => {
    setMustWatch(
      mustWatch.filter((mId) => mId !== movie.id)
    );
  };

  // Updates localStorage whenever the Watchlist changes.
  useEffect(() => {
  localStorage.setItem("mustWatch", JSON.stringify(mustWatch));
  }, [mustWatch]);
  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;