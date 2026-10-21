import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MovieList from "../movieList";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import Grid from "@mui/material/Grid";

const MovieRecommendations = ({ movieId }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["recommendations", { id: movieId }],
        queryFn: getMovieRecommendations,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h2>{error.message}</h2>;
    }
    const movies = data.results;

    if (!movies || movies.length === 0) {
        return <p>No recommendations available.</p>
    }

    return (
        <>
           <h2>Recommended Movies</h2>

           <Grid container>
           <MovieList
            movies={movies}
            action={(movie ) => {
                return <AddToFavoritesIcon movie={movie} />;
            }} 
            />
            </Grid>
        </>
    );
};

export default MovieRecommendations;