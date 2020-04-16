import React,{useState,useEffect,useContext} from "react"
import "../App.css"
import {UserContext} from "../App"
import image from "./profile.svg"
import {useParams} from "react-router-dom"

const Profile = () => {
    const [userProfile,setProfile] = useState(null);
    const {state,dispatch} = useContext(UserContext);
    const {userid} = useParams();
    useEffect(()=> {
        fetch('http://localhost:5000/user/'+userid,{
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
        .then((data) => {
            setProfile(data);
        })
    })

    return(
        <div class="main-container">
            <div className="inner-profile-container">

                <div>
                    <img src={image} className="profilepicture" />
                </div>

                <div>
                    <h4> 
                        {userProfile ? userProfile.user.name : "loading"}
                    </h4>
                    <div className="profile-details">
                        <h5> 20 Posts</h5>
                        <h5> 20 Followers</h5>
                        <h5> 20 Following</h5>
                    </div>

                </div> 

            </div>
            <div className="gallery">
            { userProfile ?
            userProfile.post.map((item) => {
                return (
                    <img src={item.photo} className="gallery-image" />
                )       
            }) : "loading"
        }
            </div>
        </div>
    )
}

export default Profile 