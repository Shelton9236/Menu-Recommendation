import React, { Component } from 'react';
import {
    Button,
    Container,
    Grid,
    Paper,
    Typography,
    Chip,
    Divider,
  } from "@material-ui/core";
import './Recipe.css';

//icons
import FavoriteIcon from "@material-ui/icons/Favorite";

class Recipe_user extends Component {
    
    constructor(props) {
        super(props)
        var recipeid = this.props.location.search
        recipeid = recipeid.substring(recipeid.lastIndexOf("\=") + 1, recipeid.length)
        // console.log(recipeid)
        this.state = {
            id: recipeid,
            Recipe: [],
            username: ""
        }
    }

    componentDidMount() {
        let detailurl = "/api/usercreate/singlerecipe?id=" + this.state.id;
        fetch(detailurl)
            .then(response => response.json().then(data => {
                this.setState({
                    Recipe: data
                })
                console.log(data)
        }));
        
    };

    render() {
        const {
            recipe_name,
            description,
          } = this.state.Recipe;
        const steps = this.state.Recipe.step;
        const ingredients = this.state.Recipe.ingredient;
        const listSteps =
            steps &&
            steps.map((steps) => (
            <Typography
                variant="body2"
                gutterBottom
                style={{ textTransform: "capitalize" }}
            >
                {steps}
            </Typography>
        ));
        const listIngredients = 
            ingredients && 
            ingredients.map((ingredients) => <Chip label={ingredients} />);

        return (
        <div>
        <Container style={{ marginBottom: 60 , paddingTop: 20}}>
          <div>
            <Button variant="outlined">
              <a href="/">
                Back Home
              </a>
            </Button>
          </div>
          <Typography
            variant="h2"
            style={{ textTransform: "capitalize", marginTop: 20 }}
            gutterBottom
          >
            {recipe_name}
          </Typography>
          <div>
            <Typography
              variant="subtitle1"
              style={{ textTransform: "capitalize", marginTop: 20 }}
              gutterBottom
            >
              {description}
            </Typography>
          </div>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="flex-start"
            style={{ marginTop: 40 }}
          >
            <Grid item xs={6}>
              <img
                style={{ width: 500, marginLeft: 20 }}
                src="http://localhost:4000/public/noimage.png"
                alt="RecipeImg"
              />
            </Grid>
            <Grid item xs={6}>
              <br />
              <br />
              <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Ingredients</Typography>
                <Divider style={{ marginBottom: 10, marginTop: 10 }} />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {listIngredients}
                </div>
                <br />
                <div>
                  <Typography variant="h6">Directions</Typography>
                  <Divider style={{ marginBottom: 10, marginTop: 10 }} />
                  {listSteps}
                </div>
              </Paper>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<FavoriteIcon />}
                >
                  Save To Favourites
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
        </div>

        );
    }
}

export default Recipe_user;