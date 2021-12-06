import React, { Component } from "react";
import { Form } from "react-bootstrap";
import {
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Card,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import {
  Add as AddIcon , 
  StarBorder as StarBorderIcon,
  Favorite as FavoriteIcon,
  Face as FaceIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from '@material-ui/icons/';

import "./Recipe.css";



class RecipePage extends Component {
  constructor(props) {
    super(props);
    var recipeid = this.props.location.search;
    recipeid = recipeid.substring(
      recipeid.lastIndexOf("=") + 1,
      recipeid.length
    );
    this.state = {
      id: recipeid,
      Recipe: [],
      comment: [],
      rating: 5,
      review: "",
      username: "",
      imgurl: "",
    };
  }

  componentDidMount() {
    let detailurl = "/api/singlerecipe?id=" + this.state.id;
    fetch(detailurl).then((response) =>
      response.json().then((data) => {
        this.setState({
          Recipe: data,
        });
      })
    );

    let getcomurl = "/api/getcomment?id=" + this.state.id;
    fetch(getcomurl).then((response) =>
      response.json().then((data) => {
        this.setState({
          comment: data,
        });
        // console.log("comments: ", this.state.comment);
      })
    );

    let getimgurl = "/api/foodimageurl?id=" + this.state.id;
    fetch(getimgurl).then((response) =>
      response.json().then((data) => {
        this.setState({
          imgurl: data.url,
        });
        // console.log(this.state.imgurl);
      })
    );
  }

  onSubmit = (e) => {
    e.preventDefault();
    const body = {
      recipeid: this.state.id,
      rating: this.state.rating,
      review: this.state.review,
    };
    fetch("/api/postcomment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // console.log(this.state);
    alert("Your comment was submitted!");
    window.location.reload(true);
  };

  addFav = (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('logged')) {
      const body = {
        username: sessionStorage.getItem('user'),
        recipeid: this.state.id,
      };
    fetch("/api/dashboard/postfavorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // console.log(this.state);
    alert("This recipe is added to your favorite!");
    }
    else {
      alert("Please log in to add favorite!");
    }
  };

  addCart = (e) => {
    e.preventDefault();
    if (sessionStorage.getItem('logged')) {
    fetch("/api/addshoplist?id=" 
      + this.state.id + "&name=" 
      + sessionStorage.getItem('user'), 
    { method: "POST" });
    // console.log(this.state);
    alert("The ingredients have been added to your shopping list!");
    }
    else {
      alert("Please log in to add favorite!");
    }
  };

  render() {
    const {
      name,
      description,
      calorie,
      totalfat,
      totalcarbon,
      protein,
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
          <AddIcon fontSize="small"/> {steps}
        </Typography>
      ));

    const listIngredients =
      ingredients && ingredients.map((ingredients) => 
      <Chip 
        style={{marginLeft:"0.5rem", marginBottom:"0.25rem"}} 
        label={ingredients} />);

    const comments = this.state.comment;
    const showcoms = [];
    if (comments.length>0) {
      for (var i = 0; i < comments.length; i++) {
      showcoms.push(
        <Card variant="outlined" style={{ marginBottom: 15, width: 700 }}>
          <CardContent>
            <Typography variant="subtitle1" gutterBottom>
              <FaceIcon
                color="primary"
                fontSize="large"
                style={{ marginRight: 10 }}
              />
              Review by {comments[i].user_id}
              <br />
              <Typography variant="body2">
                on {comments[i].submitted_date.substring(0, 10)} at{" "}
                {comments[i].submitted_date.substring(11, 16)}
              </Typography>
            </Typography>
            <br />
            <Typography variant="body1">{comments[i].review}</Typography>
          </CardContent>
        </Card>
      );}
    }
    else {
      showcoms.push(
      <Paper> 
      <p> </p>
      <p>  Sorry, no comments for this recipe at this moment.</p>  
      </Paper>
      );
    }
    
    const comfield = [];
    if (sessionStorage.getItem('logged')) {
      comfield.push(
        <Form>
            <Typography variant="h4" style={{ marginBottom: 10 }}>
              Rate this recipe
            </Typography>
            <Typography component="legend">0-5 Stars</Typography>
            <Rating
              defaultValue={5}
              precision={0.5}
              size="large"
              onChange={(e) => this.setState({ rating: e.target.value })}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
          <Form.Group controlId="Comment.NameInput">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="user_id"
              placeholder="Your name here"
              value={sessionStorage.getItem('user')}
              disabled
            />
          </Form.Group>
          <Form.Group controlId="Comment.Text">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              name="review"
              rows={5}
              type="comment"
              placeholder="Comment on this recipe!"
              value={this.state.review}
              onChange={(e) => this.setState({ review: e.target.value })}
            />
          </Form.Group>
          <Button variant="outlined" color="primary" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      );
    }
    else {
      comfield.push(
      <Form>
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Rate this recipe
          </Typography>
          <Typography component="legend">0-5 Stars</Typography>
          <Rating
            defaultValue={5}
            precision={0.5}
            size="large"
            onChange={(e) => this.setState({ rating: e.target.value })}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        <Form.Group controlId="Comment.NameInput">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="user_id"
            placeholder="Your name here"
            value={sessionStorage.getItem('user')}
          />
        </Form.Group>
        <Form.Group controlId="Comment.Text">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            name="review"
            rows={5}
            type="comment"
            placeholder="Comment on this recipe!"
            value={this.state.review}
            onChange={(e) => this.setState({ review: e.target.value })}
          />
        </Form.Group>
        <Button variant="outlined" color="primary" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
    }

    return (
      <div>
        <Container style={{ marginBottom: 60, paddingTop: 20}}>
          <div>
            <Button variant="outlined">
              <a href="/" on>
                Back Home
              </a>
            </Button>
          </div>
          <Typography
            variant="h2"
            style={{ textTransform: "capitalize", marginTop: 20, marginRight: "5%"}}
            gutterBottom
          >
            {name}
          </Typography>
          <div>
            <Typography
              variant="subtitle1"
              style={{ textTransform: "capitalize", marginTop: 20, marginRight: "3%"}}
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
              { this.state.imgurl.length>0 && 
                <img
                style={{ width: 500, marginLeft: '2rem', marginTop: '2rem'}}
                src={this.state.imgurl}
                alt="RecipeImg"
              />
              }
              {
                this.state.imgurl.length===0 &&
                <CircularProgress style={{marginLeft:'50%', marginTop:'50%'}}/>

              }
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <Chip
                          label="Calories"
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        />
                        <ListItemText>{calorie}</ListItemText>
                      </ListItem>
                      <ListItem>
                        <Chip
                          label="Total Fat(g)"
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        />
                        <ListItemText>{totalfat}</ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <Chip
                          label="Carbs(g)"
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        />
                        <ListItemText>{totalcarbon}</ListItemText>
                      </ListItem>
                      <ListItem>
                        <Chip
                          label="Protein(g)"
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: 10 }}
                        />
                        <ListItemText>{protein}</ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
              <br />
              <br />
              <Paper style={{ padding: 20 }}>
                <Typography variant="h6">Ingredients</Typography>
                <Divider style={{ marginBottom: '0.4rem', marginTop: '0.4rem' }} />
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
                  onClick={this.addFav}
                  style={{ marginRight: '1rem' }}
                >
                  Favourites
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={this.addCart}
                >
                  Shopping List
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
        
        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          {comfield}
        </Container>

        <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Typography variant="h4">Reviews</Typography>
          {showcoms}
        </Container>
      </div>
    );
  }
}

export default RecipePage;

