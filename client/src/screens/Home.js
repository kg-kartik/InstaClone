import React,{useState, useEffect,useContext} from "react"
import {UserContext} from "../App";
import {Link} from "react-router-dom";

const Home = () => {
    const [data,setData] = useState([]);
    const {state,dispatch} = useContext(UserContext)
    useEffect(() =>{
        fetch('http://localhost:5000/followingposts',{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
        .then((result) => {
            setData(result);
        })
    },[])

    //Like posts
    const likePost = (id) => {
        fetch('http://localhost:5000/likes',{
            method : "post",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                postId : id 
            })
        }).then((res) => res.json())
        .then((result) => {

            //Updating the state with likes array
            const newData = data.map((item) => {
                if(item._id == result._id){
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData);

        }).catch((err) => {
            console.log(err);
        })
    }

    //Unlike Posts 
    const unlikePost = (id) => {
        fetch('http://localhost:5000/unlikes',{
            method : "post",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                postId : id 
            })
        }).then((res) => res.json())
        .then((result) => {

            const newData = data.map((item) => {
                if(item._id == result._id){
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData);

        }).catch((err) => {
            console.log(err);
        })
    }

    //Comments function
    const makeComment = (text,postId) => {
        fetch("http://localhost:5000/comments",{
            method : "post",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({ 
                text,
                postId
            })
        }).then((res) => res.json())
        .then((result) => {
            
            const newData = data.map((item) => {
                if(item._id == result._id) {
                    return result
                }
                else {
                    return item
                }
            })
            setData(newData);
            console.log(newData);
        }).catch((err) => {
            console.log(err);
        })
    }

    //Delete Post 
    const deletePost = (postId) => {
        fetch("http://localhost:5000/delete/"+postId ,{
            method: "delete",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
            }
        }).then((res) => res.json())
          .then((result) => {
              
                const newData = data.filter((item) => {
                    return item._id !== result._id
                })
                setData(newData);
          })
    }

    return (
        <div className = "home">
       {
           data.map((item)=>{
            return (
            <div className="home">
            <div className="card home-card">
                <h5 style={{padding : "5px"}}> <Link to ={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id :"/profile/"}>
                    {item.postedBy.name}</Link> 
                    {
                        item.postedBy._id === state._id ? 
                        <i className="material-icons right" 
                        onClick = {() => { deletePost(item._id) }}>delete</i> :
                        ""
                    } 
                </h5>
                <div className="card-image">
                    <img src={item.photo} />
                </div>

                <div className="card-content">
                    {item.likes.includes(state._id) ? 
                        <i className="material-icons" 
                        onClick = {() => { unlikePost(item._id) }}>thumb_down</i>
                     :
                        <i className="material-icons"
                        onClick = {() => { likePost(item._id) }}>thumb_up</i>
                }
                    <h6> {item.likes.length} Likes</h6>
                    <h6> {item.title}</h6>
                    <p> {item.body}</p>
                    {
                        item.comments.map((comment) => {
                            return (
                                <h6>  <span style ={{fontWeight : "bold"}}> {comment.postedBy.name} </span> {comment.text} </h6>
                            )
                        })
                    }
                    <form onSubmit = {(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value,item._id);
                    }}>
                        <input type="text" placeholder="Add your comment" />
                    </form>
                </div>
            </div>

        </div>
            ) })
       }
       </div>
        
    )
}

export default Home