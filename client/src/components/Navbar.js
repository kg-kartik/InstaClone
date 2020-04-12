import React from "react"
import "../App.css"

const Navbar = () => {
    return (
    <nav>
        <div className="nav-wrapper white">
            <a href="/" className="brand-logo left">Instagram</a>
            <ul id="nav-mobile" className="right">
            <li><a href="/signup">SignUp</a></li>
            <li><a href="/signin">SignIn</a></li>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/createpost">CreatePost</a></li>
            </ul>
        </div>
    </nav>
    )
}

export default Navbar