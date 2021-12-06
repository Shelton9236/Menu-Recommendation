import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { ToggleButtonGroup , ToggleButton } from '@material-ui/lab';
import { Button , Card , ListGroup} from "react-bootstrap";
import { Timer as TimerIcon } from '@material-ui/icons';


const hpdataurl = "/api/frontpage";

const HomePage = () => {
  const [IdxData, setIdxData] = useState([]);  
  const [tag, setTag] = useState(null);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(hpdataurl, {params: {tag: tag}}).then((response) => setIdxData(response.data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  // For dev use
  // if (sessionStorage.getItem('logged'==1)) {
  //   console.log("current user is:", sessionStorage.getItem('user'));
  // }
  // else {
  //   console.log('not logged in');
  // }

  const handleChange = (event, newTag) => {
    setTag(newTag);
    axios.get(hpdataurl, {params: {tag: newTag}}).then((response) => setIdxData(response.data));
  };
  
  const data = IdxData;
  const items = [];
  
  // For dev use
  // console.log(tag); 


  for (var i = 0; i < data.length; i++) {
    items.push(
      <Card bg="light">
        
        <Card.Header style={{verticalAlign: "top"}}>
          <Card.Title>{data[i].name} </Card.Title>
        </Card.Header> 

        <Card.Body style={{verticalAlign: "bottom"}}>
          <Card.Text>
            <ListGroup variant="flush" style={{textAlign: "center"}}>
              <ListGroup.Item>
                {data[i].n_ingredient} Ingredient(s)
                <br />
                {data[i].n_step} Step(s)
                <br />
                <TimerIcon /> {data[i].minutes} minutes
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>

        <Card.Footer>
          <Button>
          <a href={"Recipe?reci_id=" + data[i].reci_id}>Full Recipe</a>
          </Button>
        </Card.Footer>

      </Card>
    );
  }

  return (
    <div className="index-page">
      <div className="index-body">
        <h1>Stay Home Healthy</h1>
      </div>
        <div class="container .container">

        <div class="row">
          <h2>Featured {tag} Recipes</h2>
        </div>

        <div class="row">
          <ToggleButtonGroup 
            value={tag} name="tag" defaultValue={null}
            exclusive
            onChange={handleChange}>
            <ToggleButton value={"breakfast"}>Breakfast</ToggleButton>
            <ToggleButton value={"lunch"}>Lunch</ToggleButton>
            <ToggleButton value={"dinner"}>Dinner</ToggleButton>
            <ToggleButton value={"asian"}>Asian</ToggleButton>
            <ToggleButton value={"seafood"}>Seafood</ToggleButton>
            <ToggleButton value={"holiday-event"}>Holiday/Event</ToggleButton>
            <ToggleButton value={"birthday"}>Birthday</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div class="row">
          {items}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
