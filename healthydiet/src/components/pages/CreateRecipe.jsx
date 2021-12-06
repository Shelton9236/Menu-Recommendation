import React, { Component } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import "./PersonalPlanPage.css";

const CreateRecipeUrl = '/api/usercreate/postrecipe';

class CreateRecipe extends Component {

    constructor(props) {
        super(props);
        var user = this.props.location.search
        user = user.substring(user.lastIndexOf("\=") + 1, user.length)
        this.state = {
            username: user,
            recipename: '',
            description: '',
            minutes: 1,
            nstep: 1,
            ningredient: 1,
            step: '',
            ingredient: '',
        };
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        const body = {
            username: this.state.username,
            recipename: this.state.recipename,
            description: this.state.description,
            minutes: this.state.minutes,
            ingredient: this.state.ingredient,
            step: this.state.step,
            nstep: this.state.step.split(/[;]+/).length,
            ningredient: this.state.ingredient.split(/[,]+/).length,

        };
        console.log(body);
        fetch(CreateRecipeUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        alert('Your recipe was submitted!');
        window.location.href = "Login";
        // return <UserPage username={this.state.username} />;
    }



    render() {

        const form = [
        <Container
            style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            }}>
            <br />
            <Form style={{ width: "90%" }}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    placeholder="Recipe Name" style={{ width: "80%"}}
                    onChange={(e) => this.setState({ recipename: e.target.value })}
                /><br />
                <Form.Label>Description</Form.Label>
                <Form.Control
                    placeholder="Simply Describe The Recipe" 
                    as="textarea" style={{ width: "80%"}}
                    onChange={(e) => this.setState({ description: e.target.value })}
                />
                <br />
            <Form.Row>

                <Col>
                <Form.Label>Time</Form.Label>
                <Form.Control
                    placeholder="Time (minutes)" type="number" min={1}
                    style={{ width: "35%"}}
                    onChange={(e) => this.setState({ minutes: e.target.value })}
                /> 
                </Col>

            </Form.Row>
            <br />

            <Form.Row>
                <Col>
                <Form.Label>Ingredients (seperated by comma ",")</Form.Label>
                <Form.Control
                    placeholder="Ingredients"
                    style={{ width: "80%"}} 
                    onChange={(e) => this.setState({ ingredient: e.target.value })}
                />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <Col>
                <Form.Label>Steps (seperated by semicolon ";")</Form.Label>
                <Form.Control
                    placeholder="Steps" as="textarea"
                    style={{ width: "80%"}} 
                    onChange={(e) => this.setState({ step: e.target.value })}
                />
                </Col>
            </Form.Row>
            <br />
            <Form.Row>
                <script></script>

            </Form.Row>
            <br />
            <Button variant="outline-primary" onClick={this.onSubmitForm}>
                Submit
            </Button>
            </Form>
        </Container>
    ];

    return(
        <div>
            <div class='container'>
                {form}
            </div>
        </div>
    )
}}

export default CreateRecipe;