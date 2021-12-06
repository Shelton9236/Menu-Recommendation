import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

//pages
import HomePage from './components/pages/index.jsx';
import PersonalPlanPage from './components/pages/PersonalPlanPage';
import NotFoundPage from './components/pages/NotFoundPage';
import RecipePage from './components/pages/Recipe';
import NavigationBar from './components/navbar';
import CreateRecipe from './components/pages/CreateRecipe';
import LogIn from './components/pages/LogIn';
import Recipe_user from './components/pages/Recipe_user';


function App() {

  return (
    <div className="App">
      <NavigationBar />
      <div style={{ marginTop: "70px" }}>
        <Router>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/personalplan' component={PersonalPlanPage} />
            <Route exact path='/recipe' component={RecipePage} />
            {/* <Route exact path='/user' component={UserPage} /> */}
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/create' component={CreateRecipe} />
            <Route exact path='/recipe_new' component={Recipe_user} />

            <Route exact path='/404' component={NotFoundPage} />

            <Redirect to='/404' />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
