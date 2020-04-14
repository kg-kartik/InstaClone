import React,{useState,useContext} from "react"
import {Link,Router,useHistory} from "react-router-dom"
import M from "materialize-css"
import {UserContext} from "../App"

const SignIn = () => {
  const {state,dispatch} = useContext(UserContext);
  const history = useHistory();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const postData = () => {
   if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) {

       M.toast({html : "Invalid Email",classes : "#c62828 red darken-3"})
       return;
   }
   fetch("http://localhost:5000/signin",{
     method : "post",
     headers : {
       "Content-Type" : "application/json"
     },
     body : JSON.stringify({
       email,
       password
     })
   }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.error) {
          M.toast({
            html : data.error,classes : "#c62828 red darken-3"
          })
        }
        else {
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user",JSON.stringify(data.user));
          dispatch({type : "USER",payload : data.user})
          M.toast({
            html : "User signed in successfully",classes : "#4caf50 green"
          })
          history.push("/");
        }
      })
    }

    return (
        <div className="mycard">
          <div className="card auth-card">
            <h2> Instagram</h2>
            <input type ="text" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="email" />
            <input type ="text" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="password" />
            <button className="btn waves-effect waves-light" onClick ={() => postData()}>Submit
                Sign In
            </button>
            <br /><br />
                <Link to = "/signup"> Don't have an account? Sign Up</Link>
          </div>
        </div>

    )
}

export default SignIn