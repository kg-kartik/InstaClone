import React,{useEffect,createContext,useReducer, useContext} from 'react';
import './App.css';
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./screens/Home"
import SignUp from "./screens/SignUp"
import SignIn from "./screens/SignIn"
import Profile from "./screens/Profile"
import CreatePost from "./screens/CreatePost";
import {reducer,initialState} from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);
  useEffect(() => {
    //As soon as the component loads it checks whether the user has token or not and redirects accordingly
    const user = JSON.parse(localStorage.getItem("user"));
    if(user) {
      dispatch({
        type : "USER",
        payload : user
      })
    }
    else {
      history.push('/signin');
    }
  },[])
return (

  <Switch>
    
    <Route exact path="/">
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

    <Route path ="/createpost">
      <CreatePost />
    </Route>

  </Switch>
)
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider value = {{state,dispatch}} >
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
