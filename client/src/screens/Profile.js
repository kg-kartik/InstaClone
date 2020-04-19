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
        <div>
            {state ? 
        
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
                        <h5> {photos ? photos.length : "0"} posts</h5>
                        <h5> {state.followers ? state.followers.length : "0"} Followers</h5>
                        <h5> {state.following.length} Following</h5>
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
        </div> : 
            <h1> Loading </h1> }
        </div>
    )
}

export default Profile 