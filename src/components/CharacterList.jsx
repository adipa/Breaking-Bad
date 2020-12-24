import React, { useState, useEffect } from "react";
import CharacterService from "../services/CharacterService";
import {
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  Button,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    align: "center",
    flexGrow: 1,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    padding: theme.spacing(1),
    margin: "auto",
    width: "900px",
  },
  img: {
    margin: "auto",
    display: "block",
    width: "200px",
    height: "200px",
  },
  formControl: {
    minWidth: 200,
    margin: "auto",
  },
}));

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [pagination, setPagination] = useState(true);

  const classes = useStyles();

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleNameChange = (event, value) => {
    setName(event.target.value);
    event.target.value ? setPagination(false) : setPagination(true);
    setCategory("");
  };

  const handleCategoryChange = (event, value) => {
    setCategory(value.props.value);
    value.props.value ? setPagination(false) : setPagination(true);
    setName("");
    !value.props.value && retrieveCharacters();
  };

  const retrieveCharacters = () => {
    CharacterService.getList(page)
      .then((response) => {
        setCharacters(response.data);
        console.log(response.data.length);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveCharacters, [page]);

  const searchByName = () => {
    CharacterService.getByName(name)
      .then((response) => {
        setCharacters(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(searchByName, [name]);

  const retrieveByCategory = () => {
    category &&
      CharacterService.getByCategory(category)
        .then((response) => {
          setCharacters(response.data);
          console.log(category);
          console.log(response.data.length);
        })
        .catch((e) => {
          console.log(e);
        });
  };

  useEffect(retrieveByCategory, [category]);

  return (
    <div className={classes.root}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12}>
          <Typography align="center" variant="h2" gutterBottom>
            <b>BREAKING BAD</b>
          </Typography>
        </Grid>

        <Pagination
          count={7}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          color="secondary"
          onChange={handlePageChange}
          size="large"
          disabled={!pagination}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Category
          </InputLabel>

          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"Breaking+Bad"}>Breaking Bad</MenuItem>
            <MenuItem value={"Better+Call+Saul"}>Better Call Saul</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-search"
          label="Search by name"
          type="search"
          variant="outlined"
          onChange={handleNameChange}
          value={name}
        />

        {characters &&
          characters.map((char) => (
            <Paper key={char.char_id} elevation={3}>
              <Grid container spacing={2} className={classes.grid}>
                <Grid item>
                  <img className={classes.img} alt={char.img} src={char.img} />
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="h5">
                        <b>{char.name}</b>
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        Occupation:
                      </Typography>
                      {char.occupation.map((occp) => (
                        <Typography variant="h6" gutterBottom>
                          {occp}{" "}
                        </Typography>
                      ))}

                      <Typography
                        variant="h6"
                        gutterBottom
                        color="textSecondary"
                      >
                        Date of Birth: {char.birthday}
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        color="textSecondary"
                      >
                        Status: {char.status}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          href={"/" + char.char_id}
                        >
                          Know More
                        </Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          ))}
      </Grid>
    </div>
  );
};

export default CharacterList;
