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
            const id = result._id;
            console.log(id);
            dispatch({type : "UPDATE",payload : {
                following : result.following,
                followers : result.followers
            }})
            localStorage.setItem("user",JSON.stringify(result));
            setProfile((prevState) => {
                return {
                    ...prevState,
                    user : {
                        ...prevState.user,
                        followers : [...prevState.user.followers,id]
                    }
                }    
            })
        })
    }


    const unfollowUser = () => {
        fetch("http://localhost:5000/unfollow", {
            method : 'post',
            headers : {
                "Authorization" : "Bearer "+ localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                unfollowId : userid
            })
        }).then((res) => res.json())
        .then((result) => {
            const id = result._id;
            console.log(id);
            dispatch({type : "UPDATE",payload : {
                following : result.following,
                followers : result.followers
            }})
            localStorage.setItem("user",JSON.stringify(result));
            setProfile((prevState) => {
                const newData = prevState.user.followers.filter((id) => {
                    return id  !== result._id
                })
                return {
                    ...prevState,
                    user : {
                        ...prevState.user,
                        followers : newData
                    }
                }    
            })
        })
    }
    var follow = JSON.parse(localStorage.getItem("user"));
    console.log(follow);
    var followersid = follow.following;
    console.log(followersid);
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
                        <h5> {userProfile.user.following ? userProfile.user.following.length : 0} Following </h5>
                    </div>
                    <div>

                    {followersid.includes(userProfile.user._id) ?  
                        <button style = {{margin : "10px"}} className="btn waves-effect waves-light" onClick ={() => unfollowUser()}>
                            Unfollow
                        </button>
                    :
                        <button  style = {{margin : "10px"}} className="btn waves-effect waves-light" onClick ={() => followUser()}>
                            Follow
                    </button> 
                    }
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
        </div>  : <h2> loading </h2>}
    </div>
    )
}

export default Profile 