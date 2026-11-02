import React from "react";
import { useParams } from 'react-router';
import { getActorDetails } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import { Box, Typography, Paper } from "@mui/material";
import ActorMovies from "../components/actorMovies";
const ActorPage = () => {
    const { id } = useParams();

    const {
        data: actor,
        error,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["actor", { id }],
        queryFn: getActorDetails,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Paper sx={{ padding: 3 }}>
                <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 3,
                }}
                >
                    {actor.profile_path && (
                        <img
                        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                        alt={actor.name}
                        style={{
                            width: "250px",
                            maxWidth: "100%",
                            height: "auto",
                            objectFit: "contain",
                            alignSelf: "flex-start",
                        }}
                        />    
                    )}

                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {actor.name}
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 2}}>
                            <strong>Birthday:</strong> {actor.birthday || "Unknown"}
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            Biography
                        </Typography>

                        <Typography variant="body1">
                            {actor.biography || "No biography available."}
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ marginTop: 4 }}>
                <ActorMovies actorId={id} />
            </Box>
            
        </Box>
    );
};

export default ActorPage;