import {useParams, useNavigate, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

export default function Display({url}) {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    let navigate = useNavigate();

    const fetchData = async (url, id) => {
        try{
            const response = await axios.get(`${url}/${id}`);
            if(response.statusText !== "OK"){
                throw new Error ("Something wrong....Please check and try again!!!");
            }
            else{
                const data = await response.data;
                setBlog(data);
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchData(url, id);
    }, [url, id]);

    const HandleDelete = async () => {
        try{
            const response = axios.delete(`${url}/${id}`);
            if((await response).statusText !== "OK"){
                throw new Error("Something wrong....Please check and try again!!!");
            }
            else{
                console.log((await response).data);
                navigate("/");
            }
        }
        catch(err){
            console.log(err.message);
        }
    };

    return (
        <main>
            {blog && typeof blog === "object" &&
            <div className = "blogs-div">
                <h1>
                    {blog.title}
                </h1>
                <h4>
                    {blog.author}
                </h4>
                <p>
                    {blog.body}
                </p>
                <section id = "links-section">
                    <Link id = "edit-link" to = {`/edit/${id}`}>
                        <button id = "edit-btn">
                            Edit 
                        </button>
                    </Link>
                    <button id = "delete-btn" onClick = {HandleDelete}>
                        Delete
                    </button>     
                </section>
            </div> 
            }
        </main>
    );
}