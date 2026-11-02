import React, {useState, useEffect} from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';

const formControl = {
  margin: "12px 8px",
  minWidth: "90%",
  backgroundColor: "#ffffff",
  borderRadius: 1,
};

export default function FilterMoviesCard(props) {

const { data, error, isPending, isError } = useQuery({
  queryKey: ['genres'],
  queryFn: getGenres,
});

if (isPending) {
  return <Spinner />;
}

if (isError) {
  return <h1>{error.message}</h1>;
}
const genres = data.genres;
if (genres[0].name !== "All"){
  genres.unshift({ id: "0", name: "All" });
}

const handleChange = (e, type, value) => {
  e.preventDefault();
  props.onUserInput(type, value);
};

const handleTextChange = (e, props) => {
  handleChange(e, "name", e.target.value);
};

const handleGenreChange = (e) => {
  handleChange(e, "genre", e.target.value);
};

const handleSortChange = (e) => {
  handleChange(e, "sort", e.target.value);
};

  return (
    <Card 
      sx={{
        backgroundColor: "#1e1e2f",
        color: "#ffffff",
        borderRadius: 3,
        border: "1px solid #383850",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h6"
        sx={{ marginBottom: 2, fontWeight: "bold" }}
        >
          <SearchIcon sx={{ verticalAlign: "middle", marginRight: 1 }} />
          Find Movies
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel
  id="genre-label"
  shrink
  sx={{
    color: "#ffffff",
    backgroundColor: "#1e1e2f",
    paddingX: 0.5,
    "&.Mui-focused": {
      color: "#ffffff",
    },
  }}
>
  Genre
</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={{ ...formControl }}>
          <InputLabel
  id="sort-label"
  shrink
  sx={{
    color: "#ffffff",
    backgroundColor: "#1e1e2f",
    paddingX: 0.5,
    "&.Mui-focused": {
      color: "#ffffff",
    },
  }}
>
  Sort By
</InputLabel>
          <Select
          labelId="sort-label"
          id="sort-select"
          value={props.sortOption}
          label="Sort By"
          onChange={handleSortChange}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="rating">Highest Rated</MenuItem>
            <MenuItem value="newest">Newest Releases</MenuItem>
            <MenuItem value="title">Title (A-Z)</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
