import React, { Component } from "react";
import { Button , Card , ListGroup} from "react-bootstrap";
import { Timer as TimerIcon } from '@material-ui/icons';

import { Form, Col, Container } from "react-bootstrap";
import { FormControlLabel, Switch } from "@material-ui/core";
import "./PersonalPlanPage.css";

class PersonalPlanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      height: 0,
      weight: 0,
      age: 0,
      gender: "",
      mealType: "Breakfast",
      prepareTime: 5,
      region: "Any",
      dishType: "Main dish",
      vegeterian: false,
      diet: false,
      postWorkout: false,
      ingredients: [],
      displayRecipes: false,
      recipes: [],
    };

    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onSubmitForm(e) {
    // e.preventDefault();
    const {
      name,
      height,
      weight,
      age,
      gender,
      mealType,
      prepareTime,
      region,
      dishType,
      vegeterian,
      diet,
      postWorkout,
      ingredients,
    } = this.state;

    const body = {
      name: name,
      height: height,
      weight: weight,
      age: age,
      gender: gender,
      mealType: mealType,
      prepareTime: prepareTime,
      region: region,
      dishType: dishType,
      vegeterian: vegeterian,
      diet: diet,
      postWorkout: postWorkout,
      ingredients: ingredients,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    const apiurl = "/api/suggestrecipe";
    fetch(apiurl, requestOptions)
      .then(async (response) => {
        const data = await response.json();
        this.setState({ recipes: data, displayRecipes: true });
        console.log("data: ", data);
      })
      .catch((error) => {
        console.error("There was an error ", error);
      });
  }

  render() {
    const dishType = [
      { label: "Main dish", value: "maindish" },
      { label: "Side dish", value: "sidedish" },
      { label: "Appetizer", value: "Appetizer" },
    ];
    const mealType = [
      { label: "Breakfast", value: "breakfast" },
      { label: "Lunch", value: "lunch" },
      { label: "Dinner", value: "dinner" },
      { label: "Snack", value: "snack" },
    ];

    const regions = [
      { label: "Any", value: "any" },
      { label: "American", value: "american" },
      { label: "Brazilian", value: "brazilian" },
      { label: "Canadian", value: "canadian" },
      { label: "Chinese", value: "chinese" },
      { label: "French", value: "french" },
      { label: "Indian", value: "indian" },
      { label: "Indonesian", value: "indonesian" },
      { label: "Hugarian", value: "hugarian" },
      { label: "Italian", value: "italian" },
      { label: "Japanese", value: "japanese" },
      { label: "Jewish", value: "jewish" },
      { label: "Korean", value: "korean" },
      { label: "Malaysian", value: "malaysian" },
      { label: "Mexican", value: "mexican" },
      { label: "Newzealand", value: "newzealand" },
      { label: "Spanish", value: "spanish" },
      { label: "Swiss", value: "swiss" },
      { label: "Thai", value: "thai" },
      { label: "Turkey", value: "turkey" },
    ];

    const prepareTime = [
      { label: "5", value: 5 },
      { label: "10", value: 10 },
      { label: "15", value: 15 },
      { label: "20", value: 20 },
      { label: "25", value: 25 },
      { label: "30", value: 30 },
      { label: "35", value: 35 },
      { label: "40", value: 40 },
      { label: "45", value: 45 },
      { label: "50", value: 50 },
      { label: "55", value: 55 },
      { label: "60", value: 60 },
    ];

    const items = [];
    const { recipes, displayRecipes } = this.state;

    for (var i = 0; i < recipes.length; i++) {
      items.push(
        <Card bg="light">
          
          <Card.Header style={{verticalAlign: "top"}}>
            <Card.Title>{recipes[i].name} </Card.Title>
          </Card.Header> 
  
          <Card.Body style={{verticalAlign: "bottom"}}>
            <Card.Text>
              <ListGroup variant="flush" style={{textAlign: "center"}}>
                <ListGroup.Item>
                  {recipes[i].n_ingredient} Ingredient(s)
                  <br />
                  {recipes[i].n_step} Step(s)
                  <br />
                  <TimerIcon /> {recipes[i].minutes} minutes
                </ListGroup.Item>
              </ListGroup>
            </Card.Text>
          </Card.Body>
  
          <Card.Footer>
            <Button>
            <a href={"Recipe?reci_id=" + recipes[i].reci_id}>Full Recipe</a>
            </Button>
          </Card.Footer>
  
        </Card>
      );
    }

    const form = [
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <h1>Start healthy eating today</h1>
        <br />
        <Form style={{ width: "80%", padding: "0 10px 0 10px" }}>
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="Name"
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Age"
                onChange={(e) => this.setState({ age: e.target.value })}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <Form.Control
                placeholder="Height(m)"
                onChange={(e) => this.setState({ height: e.target.value })}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Weight(kg)"
                onChange={(e) => this.setState({ weight: e.target.value })}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                placeholder="Gender"
                onChange={(e) => this.setState({ gender: e.target.value })}
              >
                <option>Choose...</option>
                <option>Female</option>
                <option>Male</option>
                <option>I prefer not to say</option>
              </Form.Control>
            </Col>
            <Col></Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <Form.Label>Region</Form.Label>
              <Form.Control
                as="select"
                data-testid="region"
                onChange={(e) => this.setState({ region: e.target.value })}
              >
                {regions.map((region) => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Prepare time</Form.Label>
              <Form.Control
                as="select"
                data-testid="preparetime"
                onChange={(e) => this.setState({ prepareTime: e.target.value })}
              >
                {prepareTime.map((time) => (
                  <option key={time.value} value={time.value}>
                    {time.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <Form.Label>Meal type</Form.Label>
              <Form.Control
                as="select"
                placeholder="Meal type"
                onChange={(e) => this.setState({ mealType: e.target.value })}
              >
                {mealType.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col>
              <Form.Label>Dish type</Form.Label>
              <Form.Control
                as="select"
                placeholder="Dish type"
                onChange={(e) => this.setState({ dishType: e.target.value })}
              >
                {dishType.map((dish) => (
                  <option key={dish.value} value={dish.value}>
                    {dish.label}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <FormControlLabel
                // value="bottom"
                control={<Switch color="primary" />}
                label="Vegetarian"
                labelPlacement="bottom"
                onChange={(e) =>
                  this.setState({ vegeterian: e.target.checked })
                }
              />
            </Col>
            <Col>
              <FormControlLabel
                // value="bottom"
                control={<Switch color="primary" />}
                label="On diet"
                labelPlacement="bottom"
                onChange={(e) => this.setState({ diet: e.target.checked })}
              />
            </Col>
            <Col>
              <FormControlLabel
                // value="bottom"
                control={<Switch color="primary" />}
                label="Post-workout"
                labelPlacement="bottom"
                onChange={(e) =>
                  this.setState({ postWorkout: e.target.checked })
                }
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <Form.Label>Perferred ingredients</Form.Label>
              <Form.Control
                placeholder="Ingredients separated by comma"
                onChange={(e) =>
                  this.setState({
                    ingredients: e.target.value.replace(/\s+/g, "").split(","),
                  })
                }
              />
            </Col>
          </Form.Row>
          <br />
          <Button variant="outline-primary" onClick={this.onSubmitForm}>
            Get My Plan
          </Button>
        </Form>
      </Container>,
    ];

    if (displayRecipes) {
      return (
        <div>
          <div class="container .container">
            <div class="row">{items}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="personalplan-wrapper">{form}</div>
        </div>
      );
    }
  }
}

export default PersonalPlanPage;
