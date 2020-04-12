import React, {useState} from "react"
import {Link,useHistory} from "react-router-dom"
import axios from "axios"
import M from "materialize-css"
const SignUp = () => {
  const history = useHistory();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const postData = () => {
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ){
       M.toast({html : "Invalid Email",classes : "#c62828 red darken-3"})
       return;
    }
   fetch("http://localhost:5000/signup",{
     method : "post",
     headers : {
       "Content-Type" : "application/json"
     },
     body : JSON.stringify({
       name, 
       email,
       password
     })
   }).then((res) => res.json())
   .then((data) => {
     console.log(data.error);
     if(data.error) {
       M.toast({
        html : data.error,classes : "#c62828 red darken-3"
       })
     }
     else {
       M.toast({
         html : data.message,classes : "#4caf50 green"
       })
       history.push("/signin");
     }
   })
   console.log(name,email,password);
}

    return (
        <div className="mycard">
          <div className="card auth-card">
            <h2> Instagram</h2>

            <input type ="text" value ={name} onChange =  {(e) => {setName(e.target.value)}} placeholder="name" />
            <input type ="text" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="email" />
            <input type ="text" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="password" />

            <button className="btn waves-effect waves-light" onClick ={() => postData()}>
                SignUp
            </button>
            <br /> <br />
                <Link to = "/signin"> Already have an account?</Link>
          </div>
        </div>

    )
}

export default SignUp