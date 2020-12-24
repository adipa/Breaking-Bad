import React, { useState, useEffect } from "react";
import CharacterService from "../services/CharacterService";
import { Typography, Grid, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        align: 'center',
        flexGrow: 1,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        font: 'roboto'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    grid: {
        padding: theme.spacing(1),
        margin: 'auto',
        width: '900px',
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '400px',
        height: '400px',
    },
}));

const CharacterDetail = (props) => {
    const classes = useStyles();
    const [character, setCharacter] = useState([]);

    const getCharacter = id => {
        CharacterService.get(id)
            .then(response => {
                setCharacter(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getCharacter(props.match.params.id);
    }, [props.match.params.id]);

    return (

        <div className={classes.root}>
            <Grid container spacing={1} className={classes.grid}>
                {character.map((char) => (
                    <Paper key={char.char_id} elevation={3}>
                        <Grid container spacing={1} className={classes.grid}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h3" color="secondary">
                                    <b>{char.name}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <img className={classes.img} alt={char.img} src={char.img} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    Date of Birth: {char.birthday}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    Status: {char.status}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    Occupation:
                                </Typography>
                                {char.occupation && char.occupation.map((occp) => (
                                    <Typography variant="h5" gutterBottom>{occp} </Typography>
                                ))}
                                <Typography variant="h5" gutterBottom>
                                    Nickname: {char.nickname}
                                </Typography>
                                <Typography variant="h5" gutterBottom>
                                    Potrayed By: {char.portrayed}
                                </Typography>
                                {char.seasons && <Typography variant="h5" gutterBottom>
                                    Appeared in Seasons : {char.appearance.toString()}
                                </Typography>}
                                {char.category && <Typography variant="h5" gutterBottom>
                                    Category : {char.category.toString()}
                                </Typography>}
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </Grid>
        </div>
    );
}

export default CharacterDetail;