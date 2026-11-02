import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
const HomePage = (props) => {

  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ['discover', page],
    queryFn: getMovies,
  })

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }

  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true

 
return (
  <>
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        marginY: 4,
      }}
    >
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() => setPage((previous) => previous - 1)}
      >
        Previous
      </Button>

      <Typography>
        Page {page} of {data.total_pages}
      </Typography>

      <Button
        variant="contained"
        disabled={page >= data.total_pages}
        onClick={() => setPage((previous) => previous + 1)}
      >
        Next
      </Button>
    </Box>
  </>
);

};

export default HomePage;