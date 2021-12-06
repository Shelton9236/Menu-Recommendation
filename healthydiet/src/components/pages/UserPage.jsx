import React, { Component } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import CardList from "../CardList";

//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

class UserPage extends Component {
  constructor(props) {
    super(props);
    // var user = this.props.location.search
    var { username } = props;
    // username = username.substring(
    //   username.lastIndexOf("=") + 1,
    //   username.length
    // );
    username = sessionStorage.getItem('user');
    this.state = {
      user_name: username,
      listcreate: [],
      listfav: [],
      tabValue: 0,
    };
  }

  componentDidMount() {
    let rlurl =
      "/api/usercreate/listrecipe?user_name=" + this.state.user_name;
    fetch(rlurl).then((response) =>
      response.json().then((data) => {
        this.setState({
          listcreate: data,
        });
      })
    );

    let rfurl =
      "/api/dashboard/listfavorite?user_name=" + this.state.user_name;
    fetch(rfurl).then((response) =>
      response.json().then((data) => {
        this.setState({
          listfav: data,
        });
      })
    );
  }

  render() {
    const { user_name, tabValue } = this.state;

    return (
      <div>
        <BottomNavigation
          value={tabValue}
          onChange={(e, newValue) => {
            this.setState({ tabValue: newValue });
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Originals"
            icon={<CreateOutlinedIcon />}
          />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        </BottomNavigation>
        <div style={{ paddingTop: 40 }}>
          <div style={{ textAlign: "center" }}>
            <h2>Welcome! {user_name}</h2>
          </div>
          {tabValue === 0 ? (
            <CardList
              dataList={this.state.listcreate}
              hasAction={true}
              user={user_name}
            />
          ) : (
            <CardList dataList={this.state.listfav} hasAction={false} />
          )}
        </div>
      </div>
    );
  }
}

export default UserPage;
