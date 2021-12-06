import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";

import UserPage from "./UserPage";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      password: "",
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem('user', this.state.username);
    sessionStorage.setItem('logged', 1);
    window.location.reload(true);
  };



  render() {
    const user = sessionStorage.getItem('user');

    if (sessionStorage.getItem('logged')) {
      return <UserPage username={user} />;
    } 
    else {
      return (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <br />
          <h5> Log in to your account</h5>
          <Form
            style={{
              width: "50%",
            }}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Enter your username"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter your password" type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={this.onSubmit}
            >
              Login
            </Button>
          </Form>
        </Container>
      );
    }
  }
}

export default LogIn;
