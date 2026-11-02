import React from "react";
import {useQuery } from "@tanstack/react-query";
import { getActorMovies } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router";

const ActorMovies = ({ actorId }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["actorMovies", { id: actorId }],
        queryFn: getActorMovies,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const movies = data.cast;

    if (!movies || movies.length === 0) {
        return <p>No movie information available.</p>;
    }

    return (
        <>
          <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
            Filmography
          </Typography>

          <Grid container>
            {movies.slice(0, 12).map((movie) => (
                <Grid
                key={movie.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                sx={{ padding: "10px" }}
                >
                <Link
                  to={`/movies/${movie.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  >
                  <Paper sx={{ padding: 2, textAlign: "center" }}> 
                    {movie.poster_path ? (
                        <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                        style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                        }}
                        />
                    ) : (
                        <div 
                        style={{
                            height: "250px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        >
                            No Image
                        </div>
                    )}

                    <Typography variant="h6" sx={{ marginTop: 1 }}>
                        {movie.title}
                    </Typography>

                    <Typography variant="body2">
                        {movie.character}
                    </Typography>
                  </Paper>
                  </Link>
                  </Grid>
            ))}
          </Grid>
        </>
    );
}

export default ActorMovies;