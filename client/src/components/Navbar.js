import React,{useContext} from "react"
import "../App.css"
import {Link,useHistory} from "react-router-dom"
import {UserContext} from "../App"

const Navbar = () => {
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);
    const renderList = () => {
        if(state) {
            console.log(state);
            return [
                <li><Link to ="/profile">Profile</Link></li>,
                <li><Link to ="/createpost">CreatePost</Link></li>,
                <button onClick={()=> {
                    localStorage.clear();
                    dispatch({type : "CLEAR"});
                    history.push('/signin');
                }}>Logout</button>
            ]
        }
        else {
            return [
                <li><Link to="/signup">SignUp</Link></li>,
                <li><Link to="/signin">SignIn</Link></li>
            ]
        }
    }
    return (

    <nav>
        <div className="nav-wrapper white">
            <a href={state ? "/" : "/signin"} className="brand-logo left">Instagram</a>
            <ul id="nav-mobile" className="right">
                {renderList()}
            </ul>
        </div>
    </nav>
    )
}

export default Navbar