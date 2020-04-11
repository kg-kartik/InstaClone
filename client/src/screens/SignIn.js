import React from "react"
import {Link,Router} from "react-router-dom"

const SignIn = () => {
    return (
        <div className="mycard">
          <div className="card auth-card">
            <h2> Instagram</h2>

            <input type ="text" placeholder="email" />
            <input type ="text" placeholder="password" />
            <button className="btn waves-effect waves-light">Submit
                Login
            </button>
            {/* <Router>
                <Link to = "/signup"> Don't have an account?</Link>
            </Router> */}
          </div>
        </div>

    )
}

export default SignIn