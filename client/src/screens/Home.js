import React from "react"
import image from "../wallpaper.jpg"

const Home = () => {
    return (
        <div className="home">
            <div className="card home-card">
                <h5> Kartik </h5>
                <div className="card-image">
                    <img src={image} />
                </div>
                <div className="card-content">
                    <h6> Title</h6>
                    <p> An amazing post</p>
                    <input type="text" placeholder="Add your comment" />
                </div>
            </div>

        </div>
    )
}

export default Home