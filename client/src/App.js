import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./screens/Home"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import Profile from "./screens/Profile"

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Route path exact="/">
        <Home />
      </Route>

      <Route path ="/signup">
        <SignUp />
      </Route>

      <Route path ="/signin">
        <SignIn />
      </Route>
      
      <Route path ="/profile">
        <Profile />
      </Route>

    </BrowserRouter>
  );
}

export default App;
