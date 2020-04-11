import React from "react"
import "../App.css"
import image from "./profile.svg"
const Profile = () => {
    return (
        <div class="main-container">
            <div className="inner-profile-container">

                <div>
                    <img src={image} className="profilepicture" />
                </div>

                <div>
                    <h4> 
                        Kartik Goel
                    </h4>
                    <div className="profile-details">
                        <h5> 20 Posts</h5>
                        <h5> 20 Followers</h5>
                        <h5> 20 Following</h5>
                    </div>

                </div> 

            </div>
            <div className="gallery">
                <img src={image} className="gallery-image" />
                <img src={image} className="gallery-image" />
                <img src={image} className="gallery-image" />
                <img src={image} className="gallery-image" />
                <img src={image} className="gallery-image" />
                <img src={image} className="gallery-image" />
            </div>
        </div>
    )
}

export default Profile 