import React from "react";
import {useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const MovieCredits = ({ movieId }) => {
    const { data, error, isPending, isError } = useQuery({
        queryKey: ["credits", { id: movieId }],
        queryFn: getMovieCredits,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    const cast = data.cast;

    if (!cast || cast.length === 0) {
        return <p>No cast information available.</p>;
    }

    return (
        <>
          <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
            Cast
          </Typography>

          <Grid container>
            {cast.slice(0, 10).map((actor) => (
                <Grid
                key={actor.id}
                size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                sx={{ padding: "10px" }}
                >
                  <Paper sx={{ padding: 2, textAlign: "center" }}>
                    {actor.profile_path ? (
                        <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
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
                        {actor.name}
                    </Typography>

                    <Typography variant="body2">
                        {actor.character}
                    </Typography>
                  </Paper>
                  </Grid>
            ))}
          </Grid>
        </>
    );
}

export default MovieCredits;