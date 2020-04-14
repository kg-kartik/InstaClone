import React,{useState,useEffect,useContext} from "react"
import "../App.css"
import {UserContext} from "../App"
import image from "./profile.svg"

const Profile = () => {
    const [photos,setPhotos] = useState([]);
    const {state,dispatch} = useContext(UserContext);
    useEffect(()=> {
        fetch('/myposts',{
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
        .then((data) => {

            setPhotos(data);
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
                        {state ? state.name : "loading"}
                    </h4>
                    <div className="profile-details">
                        <h5> 20 Posts</h5>
                        <h5> 20 Followers</h5>
                        <h5> 20 Following</h5>
                    </div>

                </div> 

            </div>
            <div className="gallery">
            {
            photos.map((item) => {
                return (
                    <img src={item.photo} className="gallery-image" />
                )       
            })
        }
            </div>
        </div>
    )
}

export default Profile 