import React, { useState, useEffect } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);

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

  const addToMustWatch = (movie) => {
    let newMustWatch = [];

    if (!mustWatch.includes(movie.id)) {
      newMustWatch = [...mustWatch, movie.id];
    } else {
      newMustWatch = [...mustWatch];
    }

    setMustWatch(newMustWatch);

    console.log(newMustWatch);
  };

  const removeFromMustWatch = (movie) => {
    setMustWatch(
      mustWatch.filter((mId) => mId !== movie.id)
    );
  };

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