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
    },[])

    const followUser = () => {
        console.log(userid);
        fetch("http://localhost:5000/follow", {
            method : 'post',
            headers : {
                "Authorization" : "Bearer "+ localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                followId : userid
            })
        }).then((res) => res.json())
        .then((result) => {
            dispatch({type : "UPDATE",payload : {
                following : result.following,
                followers : result.followers
            }})
            localStorage.setItem("user",JSON.stringify(result));
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user : result
                }    
            })
            console.log(result);
            
        })
    }
    console.log(userProfile);
    return(
        
        <div>
        {userProfile ? 
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
                        <h5> {userProfile.post.length} Posts</h5>
                        <h5> {userProfile.user.followers.length} Followers</h5>
                        <h5> {userProfile.user.following.length} Following </h5>
                    </div>
                    <button className="btn waves-effect waves-light" onClick ={() => followUser()}>
                        Follow
                    </button>
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
        </div>  : <h2> loading </h2>}
    </div>
    )
}

export default Profile 