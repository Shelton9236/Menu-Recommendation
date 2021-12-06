import { Component } from "react";
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

import { Button } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShopListDrawer from './ShopListDrawer';

class NavigationBar extends Component {

  logOut = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    alert('You are logged out!');
    window.location.href = '/';
  }

  goUserPage = (e) => {
    e.preventDefault();
    window.location.href = '/login';
  }

  getShopList = (e) => {
    let slurl = "/api/listshoplist?name=" + sessionStorage.getItem('user');
    fetch(slurl).then((response) =>
      response.json().then((data) => {
        this.setState({
          shopList: data.map(d => d.ingredient),
    })
    }));
    // console.log(this.state.shopList);
  }


  render() {
    const userf = [];  
    if (sessionStorage.getItem('logged')) {
      userf.push(
        <Form inline>
          <ShopListDrawer/>

          <IconButton aria-label="AccountBox"
            onClick={this.goUserPage}
            style={{marginRight: "0.85rem"}}
          >
            <AccountBoxIcon style={{fill: "white"}}/>
          </IconButton>

          <Button variant="contained"
          color='primary'
          onClick={this.logOut}>
            Log out
          </Button>
        </Form>
      );
    }
    else {
      userf.push(
        <Nav.Link href="login">
        <Button variant="contained"
        color='primary'>
          Log in
        </Button>
      </Nav.Link>
      )
    }
    return (
      <Navbar className="navbar" bg="dark" variant="dark" fixed="top">
        <Navbar.Brand href="/">Healthy Diet</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="personalplan">Personal Meal Plan</Nav.Link>
        </Nav>
        {userf}
      </Navbar>
    );
  }
}

export default NavigationBar;
