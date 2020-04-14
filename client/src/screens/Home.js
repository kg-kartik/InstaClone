import React,{useState, useEffect} from "react"
import image from "../wallpaper.jpg"

const Home = () => {
    const [data,setData] = useState([]);
    useEffect(() =>{
        fetch('/allpost',{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then((res) => res.json())
        .then((result) => {
            console.log(result);
            setData(result);
        })
    },[])
    return (
        <div className = "home">
       {
           data.map((item)=>{
            return (
            <div className="home">
            <div className="card home-card">
                <h5> {item.postedBy.name} </h5>
                <div className="card-image">
                    <img src={item.photo} />
                </div>
                <div className="card-content">
                    <h6> {item.title}</h6>
                    <p> {item.body}</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>

        </div>
            ) })
       }
       </div>
        
    )
}

export default Home