import React,{useState,useEffect} from "react"
import {Link,useHistory} from "react-router-dom"
import M from "materialize-css"

const CreatePost = () => {
    const history = useHistory();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [photo,setPhoto] = useState("")
    const [url,setUrl] = useState("");

    useEffect(() => {
        if(url) {
        fetch("http://localhost:5000/createpost",{
            method : "post",
            headers : {
              "Content-Type" : "application/json",
              "Authorization" : "Bearer "+localStorage.getItem("jwt")
            },
            body : JSON.stringify({
              title,
              body,
              pic : url
            })
          }).then((res) => res.json())
             .then((data) => {
               if(data.error) {
                //  M.toast({
                //    html : data.error,classes : "#c62828 red darken-3"
                //  })
                console.log("error")
               }
               else {
                //  M.toast({
                //    html : data.message,classes : "#4caf50 green"
                //  })
                console.log("success");
                history.push("/");
               }
             })
        }
    }, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file",photo);
        data.append("upload_preset","insta-clone");
        data.append("cloud_name","kartik321");
        console.log("hello");
        fetch("https://api.cloudinary.com/v1_1/kartik321/image/upload",{
            method : "post",
            body : data
        }).then((res) => res.json())
        .then((data) => {
            console.log(data.url);
            setUrl(data.url);
        }).catch((err) => {
            console.log(err);
        })
        console.log(localStorage.getItem("jwt"));
    }
   
    return (
        <div className="card input-field">
            
            <input type ="text" value={title} onChange={(e) => {setTitle(e.target.value)}} placeholder="title" />
            <input type ="text" value={body} onChange={(e) => {setBody(e.target.value)}} placeholder="body" />
            
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file" onChange={(e) => {setPhoto(e.target.files[0])}} placeholder="File" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light" onClick = {() => postDetails()}>
                    Submit Post
            </button>
        </div>
    )
}

export default CreatePost