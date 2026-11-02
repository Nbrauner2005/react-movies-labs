import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router";
import Avatar from "@mui/material/Avatar";
import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";

export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false;
  }

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie);
  };

  return (
    <Card
    sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      "&:hover" : {
      transform: "translateY(-5px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    },
    }}
    >
      <CardHeader
      sx={{
        height: 90,
        boxSizing: "border-box",
        alignItems: "center",
        overflow: "hidden",
      }}
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: "red" }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography
           variant="h6" 
           component="p"
            sx={{
              fontWeight: 600,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "hidden",
            }}
            >
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        sx={{ 
          height: 0,
          paddingTop: "150%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />

      <CardContent>
        <Grid container>
          <Grid size={{ xs: 6 }}>
            <Typography variant="body2" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date?.slice(0, 4) || "N/A"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average?.toFixed(1)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions 
      disableSpacing
      sx={{
        marginTop: "auto",
        padding: 2,
        justifyContent: "space-between",
      }}
      >
        {action && action(movie)}

        <Link to={`/movies/${movie.id}`}>
          <Button
           variant="outlined" 
           size="medium"
           sx={{
            whiteSpace: "nowrap",
            textTransform: "none",
           }}
           >
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}